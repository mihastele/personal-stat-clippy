import { useState, useEffect, useCallback } from 'react'
import api from '../services/api'

// Fallback mock data when API is unavailable
import { musicStats as mockMusic, gamingStats as mockGaming, githubStats as mockGithub, chessStats as mockChess, dashboardOverview as mockDashboard } from '../data/mockData'

export function useDashboardStats() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const result = await api.getDashboardStats()
      setData(result)
      setError(null)
    } catch (err) {
      console.warn('Using mock data - API unavailable')
      setData({
        music: { total_minutes: mockMusic.totalMinutesListened, total_songs: mockMusic.totalSongs, total_artists: mockMusic.totalArtists },
        gaming: { total_playtime: mockGaming.totalPlaytime, total_games: mockGaming.totalGames, achievements_unlocked: mockGaming.achievementsUnlocked },
        github: { total_contributions: mockGithub.totalContributions, current_streak: mockGithub.currentStreak, total_stars: mockGithub.totalStars },
        chess: { rating_rapid: mockChess.rating.rapid, total_games: mockChess.totalGames, wins: mockChess.wins },
        activity: mockDashboard.activityFeed.map(a => ({ platform: a.platform, action: a.action, detail: a.detail, created_at: a.time }))
      })
      setError(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

export function useMusicStats() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const result = await api.getMusicStats()
      setData(result)
      setError(null)
    } catch (err) {
      console.warn('Using mock music data')
      setData({
        stats: { total_minutes: mockMusic.totalMinutesListened, total_songs: mockMusic.totalSongs, total_artists: mockMusic.totalArtists },
        topArtists: mockMusic.topArtists.map(a => ({ name: a.name, plays: a.plays, image_url: a.image })),
        topTracks: mockMusic.topTracks.map(t => ({ name: t.name, artist: t.artist, plays: t.plays })),
        genres: mockMusic.topGenres.map(g => ({ name: g.name, percentage: g.percentage, color: g.color }))
      })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

export function useGamingStats() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const result = await api.getGamingStats()
      setData(result)
      setError(null)
    } catch (err) {
      console.warn('Using mock gaming data')
      setData({
        stats: { 
          total_playtime: mockGaming.totalPlaytime, 
          total_games: mockGaming.totalGames, 
          achievements_unlocked: mockGaming.achievementsUnlocked,
          perfect_games: mockGaming.perfectGames
        },
        topGames: mockGaming.topGames.map(g => ({ 
          name: g.name, 
          hours: g.hours, 
          image_url: g.image,
          achievements_unlocked: g.achievements.unlocked,
          achievements_total: g.achievements.total
        }))
      })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

export function useGitHubStats() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const result = await api.getGitHubStats()
      setData(result)
      setError(null)
    } catch (err) {
      console.warn('Using mock GitHub data')
      setData({
        stats: {
          total_repos: mockGithub.totalRepos,
          total_commits: mockGithub.totalCommits,
          total_stars: mockGithub.totalStars,
          total_followers: mockGithub.totalFollowers,
          total_contributions: mockGithub.totalContributions,
          current_streak: mockGithub.currentStreak,
          longest_streak: mockGithub.longestStreak
        },
        languages: mockGithub.topLanguages.map(l => ({ name: l.name, percentage: l.percentage, color: l.color })),
        repos: mockGithub.topRepos.map(r => ({ name: r.name, stars: r.stars, forks: r.forks, language: r.language }))
      })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

export function useChessStats() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const result = await api.getChessStats()
      setData(result)
      setError(null)
    } catch (err) {
      console.warn('Using mock chess data')
      setData({
        stats: {
          rating_rapid: mockChess.rating.rapid,
          rating_blitz: mockChess.rating.blitz,
          rating_bullet: mockChess.rating.bullet,
          total_games: mockChess.totalGames,
          wins: mockChess.wins,
          losses: mockChess.losses,
          draws: mockChess.draws,
          puzzle_rating: mockChess.puzzleRating,
          puzzles_solved: mockChess.puzzlesSolved
        },
        openings: mockChess.openingStats.map(o => ({ name: o.name, games: o.games, win_rate: o.winRate }))
      })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}
