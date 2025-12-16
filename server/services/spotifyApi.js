// Spotify Web API Integration
// API Docs: https://developer.spotify.com/documentation/web-api

const SPOTIFY_API_BASE = 'https://api.spotify.com/v1'
const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/api/token'

let cachedToken = null
let tokenExpiry = 0

async function getAccessToken(clientId, clientSecret) {
  // Check if we have a valid cached token
  if (cachedToken && Date.now() < tokenExpiry) {
    return cachedToken
  }
  
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
  
  const response = await fetch(SPOTIFY_AUTH_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  })
  
  if (!response.ok) {
    throw new Error(`Spotify auth error: ${response.status}`)
  }
  
  const data = await response.json()
  cachedToken = data.access_token
  tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000 // Refresh 1 min early
  
  return cachedToken
}

async function spotifyFetch(endpoint, accessToken) {
  const response = await fetch(`${SPOTIFY_API_BASE}${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  
  if (!response.ok) {
    throw new Error(`Spotify API error: ${response.status}`)
  }
  
  return response.json()
}

// Note: These endpoints require user authorization (OAuth flow)
// Client credentials flow only allows access to public data

export async function searchArtist(name, accessToken) {
  const encoded = encodeURIComponent(name)
  return spotifyFetch(`/search?q=${encoded}&type=artist&limit=1`, accessToken)
}

export async function getArtist(artistId, accessToken) {
  return spotifyFetch(`/artists/${artistId}`, accessToken)
}

export async function getTopTracks(artistId, market, accessToken) {
  return spotifyFetch(`/artists/${artistId}/top-tracks?market=${market}`, accessToken)
}

// For full user data, you need OAuth 2.0 Authorization Code Flow
// This requires user login and redirect handling

export function getAuthUrl(clientId, redirectUri, scopes) {
  const scopeStr = scopes.join(' ')
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: redirectUri,
    scope: scopeStr,
    show_dialog: 'true'
  })
  return `https://accounts.spotify.com/authorize?${params.toString()}`
}

export async function exchangeCode(code, clientId, clientSecret, redirectUri) {
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
  
  const response = await fetch(SPOTIFY_AUTH_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri
    }).toString()
  })
  
  if (!response.ok) {
    throw new Error(`Spotify token exchange error: ${response.status}`)
  }
  
  return response.json()
}

export async function refreshAccessToken(refreshToken, clientId, clientSecret) {
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
  
  const response = await fetch(SPOTIFY_AUTH_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    }).toString()
  })
  
  if (!response.ok) {
    throw new Error(`Spotify token refresh error: ${response.status}`)
  }
  
  return response.json()
}

// User-specific endpoints (require user access token from OAuth flow)
export async function getCurrentUserProfile(accessToken) {
  return spotifyFetch('/me', accessToken)
}

export async function getTopArtists(accessToken, timeRange = 'medium_term', limit = 10) {
  return spotifyFetch(`/me/top/artists?time_range=${timeRange}&limit=${limit}`, accessToken)
}

export async function getTopTracks(accessToken, timeRange = 'medium_term', limit = 10) {
  return spotifyFetch(`/me/top/tracks?time_range=${timeRange}&limit=${limit}`, accessToken)
}

export async function getRecentlyPlayed(accessToken, limit = 20) {
  return spotifyFetch(`/me/player/recently-played?limit=${limit}`, accessToken)
}

// Genre aggregation from top artists
function aggregateGenres(artists) {
  const genreCounts = {}
  
  artists.forEach(artist => {
    (artist.genres || []).forEach(genre => {
      genreCounts[genre] = (genreCounts[genre] || 0) + 1
    })
  })
  
  const total = Object.values(genreCounts).reduce((sum, c) => sum + c, 0)
  
  const genreColors = {
    'pop': '#f59e0b',
    'rock': '#ef4444',
    'hip hop': '#8b5cf6',
    'rap': '#8b5cf6',
    'electronic': '#0ea5e9',
    'edm': '#0ea5e9',
    'indie': '#10b981',
    'r&b': '#ec4899',
    'jazz': '#f97316',
    'classical': '#6366f1',
    'metal': '#1f2937',
    'country': '#a3e635',
  }
  
  return Object.entries(genreCounts)
    .map(([name, count]) => {
      const matchedColor = Object.entries(genreColors).find(([key]) => 
        name.toLowerCase().includes(key)
      )?.[1] || '#64748b'
      
      return {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        percentage: Math.round((count / total) * 100),
        color: matchedColor
      }
    })
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 5)
}

export async function syncSpotifyData(accessToken, db) {
  console.log('Syncing Spotify data...')
  
  const [topArtists, topTracks, recentlyPlayed] = await Promise.all([
    getTopArtists(accessToken, 'medium_term', 20),
    getTopTracks(accessToken, 'medium_term', 10),
    getRecentlyPlayed(accessToken, 50)
  ])
  
  const artists = topArtists.items || []
  const tracks = topTracks.items || []
  const recent = recentlyPlayed.items || []
  
  // Estimate listening stats from recently played
  const totalTracks = recent.length
  const estimatedMinutes = totalTracks * 3.5 // Average song ~3.5 min
  const uniqueArtists = new Set(recent.map(item => item.track?.artists?.[0]?.name)).size
  
  const genres = aggregateGenres(artists)
  
  // Update database
  const userId = 1
  
  // Get existing stats to accumulate
  const existing = db.prepare('SELECT * FROM music_stats WHERE user_id = ?').get(userId)
  const newMinutes = (existing?.total_minutes || 0) + Math.round(estimatedMinutes)
  const newSongs = (existing?.total_songs || 0) + totalTracks
  
  db.prepare(`
    UPDATE music_stats 
    SET total_minutes = ?, total_songs = ?, total_artists = ?, updated_at = CURRENT_TIMESTAMP
    WHERE user_id = ?
  `).run(newMinutes, newSongs, uniqueArtists, userId)
  
  // Update top artists
  db.prepare('DELETE FROM music_top_artists WHERE user_id = ?').run(userId)
  const insertArtist = db.prepare('INSERT INTO music_top_artists (user_id, name, plays, image_url) VALUES (?, ?, ?, ?)')
  
  artists.slice(0, 5).forEach((artist, index) => {
    const imageUrl = artist.images?.[0]?.url || ''
    insertArtist.run(userId, artist.name, 100 - index * 15, imageUrl) // Estimated plays
  })
  
  // Update top tracks
  db.prepare('DELETE FROM music_top_tracks WHERE user_id = ?').run(userId)
  const insertTrack = db.prepare('INSERT INTO music_top_tracks (user_id, name, artist, plays) VALUES (?, ?, ?, ?)')
  
  tracks.slice(0, 5).forEach((track, index) => {
    const artistName = track.artists?.[0]?.name || 'Unknown'
    insertTrack.run(userId, track.name, artistName, 50 - index * 8)
  })
  
  // Update genres
  db.prepare('DELETE FROM music_genres WHERE user_id = ?').run(userId)
  const insertGenre = db.prepare('INSERT INTO music_genres (user_id, name, percentage, color) VALUES (?, ?, ?, ?)')
  
  genres.forEach(genre => {
    insertGenre.run(userId, genre.name, genre.percentage, genre.color)
  })
  
  return {
    stats: { minutes: newMinutes, songs: newSongs, artists: uniqueArtists },
    topArtists: artists.slice(0, 5).map(a => a.name),
    topTracks: tracks.slice(0, 5).map(t => t.name),
    genres
  }
}

export { getAccessToken }
