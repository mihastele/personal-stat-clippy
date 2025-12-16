// Steam Web API Integration
// API Docs: https://developer.valvesoftware.com/wiki/Steam_Web_API

const STEAM_API_BASE = 'https://api.steampowered.com'

async function steamFetch(endpoint, apiKey, params = {}) {
  const url = new URL(`${STEAM_API_BASE}${endpoint}`)
  url.searchParams.append('key', apiKey)
  url.searchParams.append('format', 'json')
  
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value)
  })
  
  const response = await fetch(url.toString())
  
  if (!response.ok) {
    throw new Error(`Steam API error: ${response.status}`)
  }
  
  return response.json()
}

export async function getSteamId(vanityUrl, apiKey) {
  const data = await steamFetch('/ISteamUser/ResolveVanityURL/v1', apiKey, {
    vanityurl: vanityUrl
  })
  return data.response?.steamid
}

export async function getPlayerSummary(steamId, apiKey) {
  const data = await steamFetch('/ISteamUser/GetPlayerSummaries/v2', apiKey, {
    steamids: steamId
  })
  return data.response?.players?.[0]
}

export async function getOwnedGames(steamId, apiKey) {
  const data = await steamFetch('/IPlayerService/GetOwnedGames/v1', apiKey, {
    steamid: steamId,
    include_appinfo: 1,
    include_played_free_games: 1
  })
  return data.response
}

export async function getRecentGames(steamId, apiKey) {
  const data = await steamFetch('/IPlayerService/GetRecentlyPlayedGames/v1', apiKey, {
    steamid: steamId,
    count: 10
  })
  return data.response
}

export async function getPlayerAchievements(steamId, appId, apiKey) {
  try {
    const data = await steamFetch('/ISteamUserStats/GetPlayerAchievements/v1', apiKey, {
      steamid: steamId,
      appid: appId
    })
    return data.playerstats
  } catch (error) {
    // Some games don't have achievements or aren't accessible
    return null
  }
}

export async function getGameSchema(appId, apiKey) {
  try {
    const data = await steamFetch('/ISteamUserStats/GetSchemaForGame/v2', apiKey, {
      appid: appId
    })
    return data.game
  } catch (error) {
    return null
  }
}

const genreMap = {
  // Common Steam app IDs and their genres
  730: 'FPS',      // CS:GO/CS2
  570: 'MOBA',     // Dota 2
  440: 'FPS',      // TF2
  1245620: 'RPG',  // Elden Ring
  1091500: 'RPG',  // Cyberpunk 2077
  1174180: 'RPG',  // Red Dead Redemption 2
  1086940: 'RPG',  // Baldur's Gate 3
  271590: 'Sandbox', // GTA V
  578080: 'Survival', // PUBG
  252490: 'Survival', // Rust
  892970: 'Action', // Valheim
}

function categorizeGame(appId, name) {
  if (genreMap[appId]) return genreMap[appId]
  
  const nameLower = name.toLowerCase()
  if (nameLower.includes('rpg') || nameLower.includes('souls')) return 'RPG'
  if (nameLower.includes('shooter') || nameLower.includes('strike')) return 'FPS'
  if (nameLower.includes('strategy') || nameLower.includes('civilization')) return 'Strategy'
  if (nameLower.includes('racing') || nameLower.includes('forza')) return 'Racing'
  if (nameLower.includes('sport') || nameLower.includes('fifa') || nameLower.includes('nba')) return 'Sports'
  
  return 'Other'
}

export async function syncSteamData(steamId, apiKey, db) {
  console.log(`Syncing Steam data for: ${steamId}`)
  
  const [ownedGames, recentGames] = await Promise.all([
    getOwnedGames(steamId, apiKey),
    getRecentGames(steamId, apiKey)
  ])
  
  const games = ownedGames.games || []
  const totalPlaytime = Math.round(games.reduce((sum, g) => sum + (g.playtime_forever || 0), 0) / 60) // Convert to hours
  const totalGames = ownedGames.game_count || games.length
  
  // Get top games by playtime
  const topGames = [...games]
    .sort((a, b) => (b.playtime_forever || 0) - (a.playtime_forever || 0))
    .slice(0, 5)
  
  // Calculate genre breakdown
  const genreHours = {}
  games.forEach(game => {
    const genre = categorizeGame(game.appid, game.name || '')
    const hours = Math.round((game.playtime_forever || 0) / 60)
    genreHours[genre] = (genreHours[genre] || 0) + hours
  })
  
  // Get achievements for top games
  let totalAchievements = 0
  let perfectGames = 0
  
  for (const game of topGames.slice(0, 5)) {
    try {
      const achievements = await getPlayerAchievements(steamId, game.appid, apiKey)
      if (achievements?.achievements) {
        const unlocked = achievements.achievements.filter(a => a.achieved === 1).length
        const total = achievements.achievements.length
        totalAchievements += unlocked
        if (unlocked === total && total > 0) perfectGames++
        
        game.achievements = { unlocked, total }
      }
    } catch (e) {
      // Skip games without achievement data
    }
  }
  
  // Update database
  const userId = 1
  
  db.prepare(`
    UPDATE gaming_stats 
    SET total_playtime = ?, total_games = ?, achievements_unlocked = ?, 
        perfect_games = ?, updated_at = CURRENT_TIMESTAMP
    WHERE user_id = ?
  `).run(totalPlaytime, totalGames, totalAchievements, perfectGames, userId)
  
  // Update top games
  db.prepare('DELETE FROM gaming_top_games WHERE user_id = ?').run(userId)
  const insertGame = db.prepare('INSERT INTO gaming_top_games (user_id, name, hours, image_url, achievements_unlocked, achievements_total) VALUES (?, ?, ?, ?, ?, ?)')
  
  topGames.forEach(game => {
    const hours = Math.round((game.playtime_forever || 0) / 60)
    const imgUrl = game.img_icon_url ? `https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg` : ''
    insertGame.run(
      userId, 
      game.name, 
      hours, 
      imgUrl,
      game.achievements?.unlocked || 0,
      game.achievements?.total || 0
    )
  })
  
  return {
    stats: { totalPlaytime, totalGames, totalAchievements, perfectGames },
    topGames: topGames.map(g => ({ name: g.name, hours: Math.round((g.playtime_forever || 0) / 60) })),
    genres: Object.entries(genreHours).map(([name, hours]) => ({ name, hours }))
  }
}
