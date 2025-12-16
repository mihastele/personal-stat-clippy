// Chess.com Public API Integration
// API Docs: https://www.chess.com/news/view/published-data-api

const CHESS_API_BASE = 'https://api.chess.com/pub'

export async function getChessProfile(username) {
  try {
    const response = await fetch(`${CHESS_API_BASE}/player/${username}`)
    if (!response.ok) throw new Error(`Chess.com API error: ${response.status}`)
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch Chess.com profile:', error)
    throw error
  }
}

export async function getChessStats(username) {
  try {
    const response = await fetch(`${CHESS_API_BASE}/player/${username}/stats`)
    if (!response.ok) throw new Error(`Chess.com API error: ${response.status}`)
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch Chess.com stats:', error)
    throw error
  }
}

export async function getChessGames(username, year, month) {
  try {
    const monthStr = month.toString().padStart(2, '0')
    const response = await fetch(`${CHESS_API_BASE}/player/${username}/games/${year}/${monthStr}`)
    if (!response.ok) throw new Error(`Chess.com API error: ${response.status}`)
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch Chess.com games:', error)
    throw error
  }
}

export async function syncChessData(username, db) {
  console.log(`Syncing Chess.com data for: ${username}`)
  
  const stats = await getChessStats(username)
  
  // Extract ratings
  const rapidRating = stats.chess_rapid?.last?.rating || 1200
  const blitzRating = stats.chess_blitz?.last?.rating || 1200
  const bulletRating = stats.chess_bullet?.last?.rating || 1200
  
  // Extract game counts
  const rapidGames = stats.chess_rapid?.record || { win: 0, loss: 0, draw: 0 }
  const blitzGames = stats.chess_blitz?.record || { win: 0, loss: 0, draw: 0 }
  const bulletGames = stats.chess_bullet?.record || { win: 0, loss: 0, draw: 0 }
  
  const totalWins = rapidGames.win + blitzGames.win + bulletGames.win
  const totalLosses = rapidGames.loss + blitzGames.loss + bulletGames.loss
  const totalDraws = rapidGames.draw + blitzGames.draw + bulletGames.draw
  const totalGames = totalWins + totalLosses + totalDraws
  
  // Puzzle stats
  const puzzleRating = stats.tactics?.highest?.rating || 1200
  const puzzlesSolved = stats.tactics?.highest?.total_attempts || 0
  
  // Update database
  const userId = 1
  db.prepare(`
    UPDATE chess_stats 
    SET rating_rapid = ?, rating_blitz = ?, rating_bullet = ?, 
        total_games = ?, wins = ?, losses = ?, draws = ?,
        puzzle_rating = ?, puzzles_solved = ?, updated_at = CURRENT_TIMESTAMP
    WHERE user_id = ?
  `).run(rapidRating, blitzRating, bulletRating, totalGames, totalWins, totalLosses, totalDraws, puzzleRating, puzzlesSolved, userId)
  
  return {
    rating: { rapid: rapidRating, blitz: blitzRating, bullet: bulletRating },
    games: { total: totalGames, wins: totalWins, losses: totalLosses, draws: totalDraws },
    puzzles: { rating: puzzleRating, solved: puzzlesSolved }
  }
}
