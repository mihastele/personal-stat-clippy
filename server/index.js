import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import Database from 'better-sqlite3'
import dotenv from 'dotenv'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// Initialize SQLite database
const db = new Database(path.join(__dirname, 'data', 'stats.db'))

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    display_name TEXT,
    email TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS connected_services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    service_name TEXT NOT NULL,
    access_token TEXT,
    refresh_token TEXT,
    external_user_id TEXT,
    connected_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS music_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    total_minutes INTEGER DEFAULT 0,
    total_songs INTEGER DEFAULT 0,
    total_artists INTEGER DEFAULT 0,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS music_top_artists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    name TEXT NOT NULL,
    plays INTEGER DEFAULT 0,
    image_url TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS music_top_tracks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    name TEXT NOT NULL,
    artist TEXT NOT NULL,
    plays INTEGER DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS music_genres (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    name TEXT NOT NULL,
    percentage REAL DEFAULT 0,
    color TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS gaming_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    total_playtime INTEGER DEFAULT 0,
    total_games INTEGER DEFAULT 0,
    achievements_unlocked INTEGER DEFAULT 0,
    perfect_games INTEGER DEFAULT 0,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS gaming_top_games (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    name TEXT NOT NULL,
    hours INTEGER DEFAULT 0,
    image_url TEXT,
    achievements_unlocked INTEGER DEFAULT 0,
    achievements_total INTEGER DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS github_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    total_repos INTEGER DEFAULT 0,
    total_commits INTEGER DEFAULT 0,
    total_stars INTEGER DEFAULT 0,
    total_followers INTEGER DEFAULT 0,
    total_contributions INTEGER DEFAULT 0,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS github_languages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    name TEXT NOT NULL,
    percentage REAL DEFAULT 0,
    color TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS github_repos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    name TEXT NOT NULL,
    stars INTEGER DEFAULT 0,
    forks INTEGER DEFAULT 0,
    language TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS chess_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    rating_rapid INTEGER DEFAULT 1200,
    rating_blitz INTEGER DEFAULT 1200,
    rating_bullet INTEGER DEFAULT 1200,
    total_games INTEGER DEFAULT 0,
    wins INTEGER DEFAULT 0,
    losses INTEGER DEFAULT 0,
    draws INTEGER DEFAULT 0,
    puzzle_rating INTEGER DEFAULT 1200,
    puzzles_solved INTEGER DEFAULT 0,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS chess_openings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    name TEXT NOT NULL,
    games INTEGER DEFAULT 0,
    win_rate REAL DEFAULT 50,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS activity_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    platform TEXT NOT NULL,
    action TEXT NOT NULL,
    detail TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS api_configs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    service_name TEXT UNIQUE NOT NULL,
    client_id TEXT,
    client_secret TEXT,
    api_key TEXT,
    enabled INTEGER DEFAULT 0
  );
`)

// Insert default user if not exists
const defaultUser = db.prepare('SELECT id FROM users WHERE username = ?').get('default')
if (!defaultUser) {
  db.prepare('INSERT INTO users (username, display_name, email) VALUES (?, ?, ?)').run('default', 'Alex Johnson', 'alex@example.com')
  
  // Insert sample data for the default user
  const userId = 1
  
  // Music stats
  db.prepare('INSERT INTO music_stats (user_id, total_minutes, total_songs, total_artists) VALUES (?, ?, ?, ?)').run(userId, 45230, 2847, 423)
  db.prepare('INSERT INTO music_top_artists (user_id, name, plays, image_url) VALUES (?, ?, ?, ?)').run(userId, 'Daft Punk', 342, '')
  db.prepare('INSERT INTO music_top_artists (user_id, name, plays, image_url) VALUES (?, ?, ?, ?)').run(userId, 'Arctic Monkeys', 287, '')
  db.prepare('INSERT INTO music_top_artists (user_id, name, plays, image_url) VALUES (?, ?, ?, ?)').run(userId, 'Kendrick Lamar', 256, '')
  db.prepare('INSERT INTO music_genres (user_id, name, percentage, color) VALUES (?, ?, ?, ?)').run(userId, 'Electronic', 32, '#0ea5e9')
  db.prepare('INSERT INTO music_genres (user_id, name, percentage, color) VALUES (?, ?, ?, ?)').run(userId, 'Indie Rock', 24, '#8b5cf6')
  db.prepare('INSERT INTO music_genres (user_id, name, percentage, color) VALUES (?, ?, ?, ?)').run(userId, 'Hip Hop', 18, '#10b981')
  
  // Gaming stats
  db.prepare('INSERT INTO gaming_stats (user_id, total_playtime, total_games, achievements_unlocked, perfect_games) VALUES (?, ?, ?, ?, ?)').run(userId, 2847, 156, 1243, 12)
  db.prepare('INSERT INTO gaming_top_games (user_id, name, hours, achievements_unlocked, achievements_total) VALUES (?, ?, ?, ?, ?)').run(userId, 'Counter-Strike 2', 487, 45, 67)
  db.prepare('INSERT INTO gaming_top_games (user_id, name, hours, achievements_unlocked, achievements_total) VALUES (?, ?, ?, ?, ?)').run(userId, 'Elden Ring', 234, 38, 42)
  db.prepare('INSERT INTO gaming_top_games (user_id, name, hours, achievements_unlocked, achievements_total) VALUES (?, ?, ?, ?, ?)').run(userId, 'Cyberpunk 2077', 178, 44, 52)
  
  // GitHub stats
  db.prepare('INSERT INTO github_stats (user_id, total_repos, total_commits, total_stars, total_followers, total_contributions, current_streak, longest_streak) VALUES (?, ?, ?, ?, ?, ?, ?, ?)').run(userId, 47, 2156, 342, 128, 1847, 23, 67)
  db.prepare('INSERT INTO github_languages (user_id, name, percentage, color) VALUES (?, ?, ?, ?)').run(userId, 'TypeScript', 35, '#3178c6')
  db.prepare('INSERT INTO github_languages (user_id, name, percentage, color) VALUES (?, ?, ?, ?)').run(userId, 'Python', 28, '#3572A5')
  db.prepare('INSERT INTO github_languages (user_id, name, percentage, color) VALUES (?, ?, ?, ?)').run(userId, 'JavaScript', 20, '#f7df1e')
  
  // Chess stats
  db.prepare('INSERT INTO chess_stats (user_id, rating_rapid, rating_blitz, rating_bullet, total_games, wins, losses, draws, puzzle_rating, puzzles_solved) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)').run(userId, 1456, 1342, 1287, 1847, 923, 756, 168, 1678, 2341)
  db.prepare('INSERT INTO chess_openings (user_id, name, games, win_rate) VALUES (?, ?, ?, ?)').run(userId, 'Sicilian Defense', 234, 52)
  db.prepare('INSERT INTO chess_openings (user_id, name, games, win_rate) VALUES (?, ?, ?, ?)').run(userId, "Queen's Gambit", 198, 48)
}

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

// API Routes

// Get all stats for dashboard
app.get('/api/stats/dashboard', (req, res) => {
  const userId = 1
  
  const musicStats = db.prepare('SELECT * FROM music_stats WHERE user_id = ?').get(userId)
  const gamingStats = db.prepare('SELECT * FROM gaming_stats WHERE user_id = ?').get(userId)
  const githubStats = db.prepare('SELECT * FROM github_stats WHERE user_id = ?').get(userId)
  const chessStats = db.prepare('SELECT * FROM chess_stats WHERE user_id = ?').get(userId)
  const recentActivity = db.prepare('SELECT * FROM activity_log WHERE user_id = ? ORDER BY created_at DESC LIMIT 10').all(userId)
  
  res.json({
    music: musicStats,
    gaming: gamingStats,
    github: githubStats,
    chess: chessStats,
    activity: recentActivity
  })
})

// Music Stats
app.get('/api/stats/music', (req, res) => {
  const userId = 1
  const stats = db.prepare('SELECT * FROM music_stats WHERE user_id = ?').get(userId)
  const topArtists = db.prepare('SELECT * FROM music_top_artists WHERE user_id = ? ORDER BY plays DESC LIMIT 5').all(userId)
  const topTracks = db.prepare('SELECT * FROM music_top_tracks WHERE user_id = ? ORDER BY plays DESC LIMIT 5').all(userId)
  const genres = db.prepare('SELECT * FROM music_genres WHERE user_id = ? ORDER BY percentage DESC').all(userId)
  
  res.json({ stats, topArtists, topTracks, genres })
})

app.put('/api/stats/music', (req, res) => {
  const userId = 1
  const { total_minutes, total_songs, total_artists } = req.body
  
  db.prepare('UPDATE music_stats SET total_minutes = ?, total_songs = ?, total_artists = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?')
    .run(total_minutes, total_songs, total_artists, userId)
  
  res.json({ success: true })
})

// Gaming Stats
app.get('/api/stats/gaming', (req, res) => {
  const userId = 1
  const stats = db.prepare('SELECT * FROM gaming_stats WHERE user_id = ?').get(userId)
  const topGames = db.prepare('SELECT * FROM gaming_top_games WHERE user_id = ? ORDER BY hours DESC LIMIT 5').all(userId)
  
  res.json({ stats, topGames })
})

app.put('/api/stats/gaming', (req, res) => {
  const userId = 1
  const { total_playtime, total_games, achievements_unlocked, perfect_games } = req.body
  
  db.prepare('UPDATE gaming_stats SET total_playtime = ?, total_games = ?, achievements_unlocked = ?, perfect_games = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?')
    .run(total_playtime, total_games, achievements_unlocked, perfect_games, userId)
  
  res.json({ success: true })
})

// GitHub Stats
app.get('/api/stats/github', (req, res) => {
  const userId = 1
  const stats = db.prepare('SELECT * FROM github_stats WHERE user_id = ?').get(userId)
  const languages = db.prepare('SELECT * FROM github_languages WHERE user_id = ? ORDER BY percentage DESC').all(userId)
  const repos = db.prepare('SELECT * FROM github_repos WHERE user_id = ? ORDER BY stars DESC LIMIT 4').all(userId)
  
  res.json({ stats, languages, repos })
})

app.put('/api/stats/github', (req, res) => {
  const userId = 1
  const { total_repos, total_commits, total_stars, total_followers, total_contributions, current_streak, longest_streak } = req.body
  
  db.prepare('UPDATE github_stats SET total_repos = ?, total_commits = ?, total_stars = ?, total_followers = ?, total_contributions = ?, current_streak = ?, longest_streak = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?')
    .run(total_repos, total_commits, total_stars, total_followers, total_contributions, current_streak, longest_streak, userId)
  
  res.json({ success: true })
})

// Chess Stats
app.get('/api/stats/chess', (req, res) => {
  const userId = 1
  const stats = db.prepare('SELECT * FROM chess_stats WHERE user_id = ?').get(userId)
  const openings = db.prepare('SELECT * FROM chess_openings WHERE user_id = ? ORDER BY games DESC').all(userId)
  
  res.json({ stats, openings })
})

app.put('/api/stats/chess', (req, res) => {
  const userId = 1
  const { rating_rapid, rating_blitz, rating_bullet, total_games, wins, losses, draws, puzzle_rating, puzzles_solved } = req.body
  
  db.prepare('UPDATE chess_stats SET rating_rapid = ?, rating_blitz = ?, rating_bullet = ?, total_games = ?, wins = ?, losses = ?, draws = ?, puzzle_rating = ?, puzzles_solved = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?')
    .run(rating_rapid, rating_blitz, rating_bullet, total_games, wins, losses, draws, puzzle_rating, puzzles_solved, userId)
  
  res.json({ success: true })
})

// API Config Management
app.get('/api/config', (req, res) => {
  const configs = db.prepare('SELECT id, service_name, client_id, api_key, enabled FROM api_configs').all()
  res.json(configs)
})

app.put('/api/config/:service', (req, res) => {
  const { service } = req.params
  const { client_id, client_secret, api_key, enabled } = req.body
  
  const existing = db.prepare('SELECT id FROM api_configs WHERE service_name = ?').get(service)
  
  if (existing) {
    db.prepare('UPDATE api_configs SET client_id = ?, client_secret = ?, api_key = ?, enabled = ? WHERE service_name = ?')
      .run(client_id, client_secret, api_key, enabled ? 1 : 0, service)
  } else {
    db.prepare('INSERT INTO api_configs (service_name, client_id, client_secret, api_key, enabled) VALUES (?, ?, ?, ?, ?)')
      .run(service, client_id, client_secret, api_key, enabled ? 1 : 0)
  }
  
  res.json({ success: true })
})

// Activity Log
app.post('/api/activity', (req, res) => {
  const userId = 1
  const { platform, action, detail } = req.body
  
  db.prepare('INSERT INTO activity_log (user_id, platform, action, detail) VALUES (?, ?, ?, ?)')
    .run(userId, platform, action, detail)
  
  res.json({ success: true })
})

// Sync endpoints (placeholders for real API integration)
app.post('/api/sync/spotify', async (req, res) => {
  // TODO: Implement real Spotify API sync
  res.json({ success: true, message: 'Spotify sync triggered (placeholder)' })
})

app.post('/api/sync/steam', async (req, res) => {
  // TODO: Implement real Steam API sync
  res.json({ success: true, message: 'Steam sync triggered (placeholder)' })
})

app.post('/api/sync/github', async (req, res) => {
  // TODO: Implement real GitHub API sync
  res.json({ success: true, message: 'GitHub sync triggered (placeholder)' })
})

app.post('/api/sync/chess', async (req, res) => {
  // TODO: Implement real Chess.com API sync
  res.json({ success: true, message: 'Chess.com sync triggered (placeholder)' })
})

// Serve admin GUI
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'))
})

app.listen(PORT, () => {
  console.log(`🚀 StatClippy Server running on http://localhost:${PORT}`)
  console.log(`📊 Admin GUI available at http://localhost:${PORT}/admin`)
})
