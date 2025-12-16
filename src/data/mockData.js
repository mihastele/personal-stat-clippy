// Mock data for the dashboard - simulates API responses from various services

export const userProfile = {
  name: 'Alex Johnson',
  username: 'alexj',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
  joinedDate: '2023-01-15',
  connectedServices: ['spotify', 'steam', 'github', 'chess'],
}

// Spotify / Music Data
export const musicStats = {
  totalMinutesListened: 45230,
  totalSongs: 2847,
  totalArtists: 423,
  topGenres: [
    { name: 'Electronic', percentage: 32, color: '#0ea5e9' },
    { name: 'Indie Rock', percentage: 24, color: '#8b5cf6' },
    { name: 'Hip Hop', percentage: 18, color: '#10b981' },
    { name: 'Pop', percentage: 14, color: '#f59e0b' },
    { name: 'Classical', percentage: 12, color: '#ef4444' },
  ],
  topArtists: [
    { name: 'Daft Punk', plays: 342, image: 'https://api.dicebear.com/7.x/shapes/svg?seed=daftpunk' },
    { name: 'Arctic Monkeys', plays: 287, image: 'https://api.dicebear.com/7.x/shapes/svg?seed=arcticmonkeys' },
    { name: 'Kendrick Lamar', plays: 256, image: 'https://api.dicebear.com/7.x/shapes/svg?seed=kendrick' },
    { name: 'Tame Impala', plays: 234, image: 'https://api.dicebear.com/7.x/shapes/svg?seed=tameimpala' },
    { name: 'The Weeknd', plays: 198, image: 'https://api.dicebear.com/7.x/shapes/svg?seed=weeknd' },
  ],
  topTracks: [
    { name: 'Blinding Lights', artist: 'The Weeknd', plays: 89 },
    { name: 'Get Lucky', artist: 'Daft Punk', plays: 76 },
    { name: 'Do I Wanna Know?', artist: 'Arctic Monkeys', plays: 71 },
    { name: 'HUMBLE.', artist: 'Kendrick Lamar', plays: 65 },
    { name: 'Let It Happen', artist: 'Tame Impala', plays: 58 },
  ],
  listeningHistory: [
    { month: 'Jan', minutes: 3200 },
    { month: 'Feb', minutes: 3800 },
    { month: 'Mar', minutes: 4100 },
    { month: 'Apr', minutes: 3600 },
    { month: 'May', minutes: 4500 },
    { month: 'Jun', minutes: 4200 },
    { month: 'Jul', minutes: 3900 },
    { month: 'Aug', minutes: 4800 },
    { month: 'Sep', minutes: 4100 },
    { month: 'Oct', minutes: 4300 },
    { month: 'Nov', minutes: 4230 },
    { month: 'Dec', minutes: 4500 },
  ],
  recentlyPlayed: [
    { name: 'Starboy', artist: 'The Weeknd', playedAt: '2 min ago' },
    { name: 'Instant Crush', artist: 'Daft Punk', playedAt: '8 min ago' },
    { name: 'R U Mine?', artist: 'Arctic Monkeys', playedAt: '15 min ago' },
    { name: 'Money Trees', artist: 'Kendrick Lamar', playedAt: '20 min ago' },
  ],
}

// Steam / Gaming Data
export const gamingStats = {
  totalPlaytime: 2847, // hours
  totalGames: 156,
  achievementsUnlocked: 1243,
  perfectGames: 12,
  topGames: [
    { name: 'Counter-Strike 2', hours: 487, image: 'https://api.dicebear.com/7.x/shapes/svg?seed=cs2', achievements: { unlocked: 45, total: 67 } },
    { name: 'Elden Ring', hours: 234, image: 'https://api.dicebear.com/7.x/shapes/svg?seed=eldenring', achievements: { unlocked: 38, total: 42 } },
    { name: 'Cyberpunk 2077', hours: 178, image: 'https://api.dicebear.com/7.x/shapes/svg?seed=cyberpunk', achievements: { unlocked: 44, total: 52 } },
    { name: 'Baldur\'s Gate 3', hours: 156, image: 'https://api.dicebear.com/7.x/shapes/svg?seed=bg3', achievements: { unlocked: 28, total: 54 } },
    { name: 'Red Dead Redemption 2', hours: 142, image: 'https://api.dicebear.com/7.x/shapes/svg?seed=rdr2', achievements: { unlocked: 51, total: 52 } },
  ],
  recentGames: [
    { name: 'Counter-Strike 2', lastPlayed: '2 hours ago', sessionTime: 45 },
    { name: 'Baldur\'s Gate 3', lastPlayed: 'Yesterday', sessionTime: 180 },
    { name: 'Elden Ring', lastPlayed: '3 days ago', sessionTime: 120 },
  ],
  playtimeHistory: [
    { month: 'Jan', hours: 180 },
    { month: 'Feb', hours: 220 },
    { month: 'Mar', hours: 195 },
    { month: 'Apr', hours: 240 },
    { month: 'May', hours: 210 },
    { month: 'Jun', hours: 280 },
    { month: 'Jul', hours: 320 },
    { month: 'Aug', hours: 290 },
    { month: 'Sep', hours: 250 },
    { month: 'Oct', hours: 230 },
    { month: 'Nov', hours: 215 },
    { month: 'Dec', hours: 217 },
  ],
  genreBreakdown: [
    { name: 'FPS', hours: 720, color: '#ef4444' },
    { name: 'RPG', hours: 890, color: '#8b5cf6' },
    { name: 'Action', hours: 540, color: '#0ea5e9' },
    { name: 'Strategy', hours: 380, color: '#10b981' },
    { name: 'Indie', hours: 317, color: '#f59e0b' },
  ],
}

// GitHub Data
export const githubStats = {
  totalRepos: 47,
  totalCommits: 2156,
  totalStars: 342,
  totalFollowers: 128,
  totalContributions: 1847,
  currentStreak: 23,
  longestStreak: 67,
  topLanguages: [
    { name: 'TypeScript', percentage: 35, color: '#3178c6' },
    { name: 'Python', percentage: 28, color: '#3572A5' },
    { name: 'JavaScript', percentage: 20, color: '#f7df1e' },
    { name: 'Go', percentage: 10, color: '#00ADD8' },
    { name: 'Rust', percentage: 7, color: '#dea584' },
  ],
  contributionHistory: [
    { month: 'Jan', contributions: 145 },
    { month: 'Feb', contributions: 178 },
    { month: 'Mar', contributions: 156 },
    { month: 'Apr', contributions: 189 },
    { month: 'May', contributions: 134 },
    { month: 'Jun', contributions: 167 },
    { month: 'Jul', contributions: 198 },
    { month: 'Aug', contributions: 145 },
    { month: 'Sep', contributions: 123 },
    { month: 'Oct', contributions: 156 },
    { month: 'Nov', contributions: 134 },
    { month: 'Dec', contributions: 122 },
  ],
  topRepos: [
    { name: 'awesome-project', stars: 89, forks: 23, language: 'TypeScript' },
    { name: 'ml-toolkit', stars: 67, forks: 18, language: 'Python' },
    { name: 'react-components', stars: 54, forks: 12, language: 'JavaScript' },
    { name: 'go-microservices', stars: 43, forks: 8, language: 'Go' },
  ],
  recentActivity: [
    { type: 'commit', repo: 'awesome-project', message: 'feat: add dark mode support', time: '2 hours ago' },
    { type: 'pr', repo: 'ml-toolkit', message: 'Merge: implement new model', time: '5 hours ago' },
    { type: 'issue', repo: 'react-components', message: 'Opened: Button accessibility', time: '1 day ago' },
    { type: 'commit', repo: 'go-microservices', message: 'fix: resolve memory leak', time: '2 days ago' },
  ],
}

// Chess.com Data
export const chessStats = {
  rating: {
    rapid: 1456,
    blitz: 1342,
    bullet: 1287,
  },
  totalGames: 1847,
  wins: 923,
  losses: 756,
  draws: 168,
  winRate: 50.0,
  puzzleRating: 1678,
  puzzlesSolved: 2341,
  ratingHistory: [
    { month: 'Jan', rapid: 1320, blitz: 1250, bullet: 1180 },
    { month: 'Feb', rapid: 1345, blitz: 1278, bullet: 1195 },
    { month: 'Mar', rapid: 1380, blitz: 1295, bullet: 1220 },
    { month: 'Apr', rapid: 1365, blitz: 1310, bullet: 1235 },
    { month: 'May', rapid: 1398, blitz: 1305, bullet: 1248 },
    { month: 'Jun', rapid: 1420, blitz: 1328, bullet: 1260 },
    { month: 'Jul', rapid: 1410, blitz: 1335, bullet: 1272 },
    { month: 'Aug', rapid: 1435, blitz: 1348, bullet: 1280 },
    { month: 'Sep', rapid: 1448, blitz: 1340, bullet: 1275 },
    { month: 'Oct', rapid: 1462, blitz: 1352, bullet: 1290 },
    { month: 'Nov', rapid: 1450, blitz: 1338, bullet: 1282 },
    { month: 'Dec', rapid: 1456, blitz: 1342, bullet: 1287 },
  ],
  openingStats: [
    { name: 'Sicilian Defense', games: 234, winRate: 52 },
    { name: 'Queen\'s Gambit', games: 198, winRate: 48 },
    { name: 'Italian Game', games: 167, winRate: 55 },
    { name: 'Caro-Kann', games: 145, winRate: 51 },
    { name: 'French Defense', games: 132, winRate: 47 },
  ],
  recentGames: [
    { opponent: 'ChessMaster42', result: 'win', rating: 1478, time: '1 hour ago' },
    { opponent: 'KnightRider', result: 'loss', rating: 1520, time: '3 hours ago' },
    { opponent: 'PawnStorm', result: 'win', rating: 1445, time: '5 hours ago' },
    { opponent: 'BishopBoss', result: 'draw', rating: 1462, time: 'Yesterday' },
  ],
}

// Dashboard Overview Data
export const dashboardOverview = {
  weeklyHighlights: [
    { platform: 'Spotify', metric: 'Minutes Listened', value: 1240, change: 12.5 },
    { platform: 'Steam', metric: 'Hours Played', value: 34, change: -8.2 },
    { platform: 'GitHub', metric: 'Contributions', value: 47, change: 23.1 },
    { platform: 'Chess.com', metric: 'Games Played', value: 28, change: 5.6 },
  ],
  activityFeed: [
    { platform: 'spotify', action: 'Listened to', detail: 'Blinding Lights by The Weeknd', time: '2 min ago' },
    { platform: 'github', action: 'Pushed to', detail: 'awesome-project', time: '1 hour ago' },
    { platform: 'steam', action: 'Played', detail: 'Counter-Strike 2 for 45 min', time: '2 hours ago' },
    { platform: 'chess', action: 'Won against', detail: 'ChessMaster42 (Rapid)', time: '3 hours ago' },
    { platform: 'spotify', action: 'Added to playlist', detail: '3 new songs', time: '5 hours ago' },
    { platform: 'github', action: 'Merged PR in', detail: 'ml-toolkit', time: '6 hours ago' },
  ],
}
