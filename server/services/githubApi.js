// GitHub API Integration
// API Docs: https://docs.github.com/en/rest

const GITHUB_API_BASE = 'https://api.github.com'

async function githubFetch(endpoint, token = null) {
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'StatClippy-App'
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  
  const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, { headers })
  
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`)
  }
  
  return response.json()
}

export async function getGitHubUser(username, token = null) {
  return githubFetch(`/users/${username}`, token)
}

export async function getGitHubRepos(username, token = null) {
  return githubFetch(`/users/${username}/repos?sort=stars&per_page=100`, token)
}

export async function getGitHubEvents(username, token = null) {
  return githubFetch(`/users/${username}/events?per_page=100`, token)
}

export async function getGitHubContributions(username) {
  // GitHub's contribution graph isn't available via REST API
  // We'll estimate from events or use a workaround
  try {
    const events = await getGitHubEvents(username)
    const pushEvents = events.filter(e => e.type === 'PushEvent')
    const commits = pushEvents.reduce((sum, e) => sum + (e.payload?.commits?.length || 0), 0)
    return { estimated_commits: commits, events_count: events.length }
  } catch (error) {
    console.error('Failed to fetch GitHub contributions:', error)
    return { estimated_commits: 0, events_count: 0 }
  }
}

function calculateStreak(events) {
  // Calculate current streak from push events
  const pushDates = events
    .filter(e => e.type === 'PushEvent')
    .map(e => new Date(e.created_at).toDateString())
  
  const uniqueDates = [...new Set(pushDates)].sort((a, b) => new Date(b) - new Date(a))
  
  if (uniqueDates.length === 0) return 0
  
  let streak = 1
  const today = new Date().toDateString()
  const yesterday = new Date(Date.now() - 86400000).toDateString()
  
  // Check if most recent activity is today or yesterday
  if (uniqueDates[0] !== today && uniqueDates[0] !== yesterday) {
    return 0 // Streak broken
  }
  
  for (let i = 1; i < uniqueDates.length; i++) {
    const current = new Date(uniqueDates[i - 1])
    const prev = new Date(uniqueDates[i])
    const diffDays = (current - prev) / 86400000
    
    if (diffDays <= 1) {
      streak++
    } else {
      break
    }
  }
  
  return streak
}

function getLanguageStats(repos) {
  const languages = {}
  
  repos.forEach(repo => {
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + (repo.size || 1)
    }
  })
  
  const total = Object.values(languages).reduce((sum, val) => sum + val, 0)
  
  const languageColors = {
    'JavaScript': '#f7df1e',
    'TypeScript': '#3178c6',
    'Python': '#3572A5',
    'Java': '#b07219',
    'Go': '#00ADD8',
    'Rust': '#dea584',
    'C++': '#f34b7d',
    'C#': '#239120',
    'Ruby': '#701516',
    'PHP': '#4F5D95',
    'Swift': '#FA7343',
    'Kotlin': '#A97BFF',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Shell': '#89e051',
    'Vue': '#41b883',
  }
  
  return Object.entries(languages)
    .map(([name, size]) => ({
      name,
      percentage: Math.round((size / total) * 100),
      color: languageColors[name] || '#6e7681'
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 5)
}

export async function syncGitHubData(username, token, db) {
  console.log(`Syncing GitHub data for: ${username}`)
  
  const [user, repos, events] = await Promise.all([
    getGitHubUser(username, token),
    getGitHubRepos(username, token),
    getGitHubEvents(username, token)
  ])
  
  const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0)
  const totalForks = repos.reduce((sum, repo) => sum + (repo.forks_count || 0), 0)
  
  // Estimate commits from recent events
  const pushEvents = events.filter(e => e.type === 'PushEvent')
  const recentCommits = pushEvents.reduce((sum, e) => sum + (e.payload?.commits?.length || 0), 0)
  
  const currentStreak = calculateStreak(events)
  const languages = getLanguageStats(repos)
  
  // Update database
  const userId = 1
  
  db.prepare(`
    UPDATE github_stats 
    SET total_repos = ?, total_commits = ?, total_stars = ?, 
        total_followers = ?, total_contributions = ?, 
        current_streak = ?, updated_at = CURRENT_TIMESTAMP
    WHERE user_id = ?
  `).run(
    repos.length, 
    recentCommits, 
    totalStars, 
    user.followers || 0, 
    recentCommits, // Using commits as proxy for contributions
    currentStreak,
    userId
  )
  
  // Update languages
  db.prepare('DELETE FROM github_languages WHERE user_id = ?').run(userId)
  const insertLang = db.prepare('INSERT INTO github_languages (user_id, name, percentage, color) VALUES (?, ?, ?, ?)')
  languages.forEach(lang => {
    insertLang.run(userId, lang.name, lang.percentage, lang.color)
  })
  
  // Update top repos
  db.prepare('DELETE FROM github_repos WHERE user_id = ?').run(userId)
  const insertRepo = db.prepare('INSERT INTO github_repos (user_id, name, stars, forks, language) VALUES (?, ?, ?, ?, ?)')
  repos.slice(0, 4).forEach(repo => {
    insertRepo.run(userId, repo.name, repo.stargazers_count, repo.forks_count, repo.language)
  })
  
  return {
    user: { login: user.login, followers: user.followers, public_repos: user.public_repos },
    stats: { repos: repos.length, stars: totalStars, commits: recentCommits, streak: currentStreak },
    languages
  }
}
