const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'

class ApiService {
  async fetch(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error)
      throw error
    }
  }

  // Dashboard
  async getDashboardStats() {
    return this.fetch('/api/stats/dashboard')
  }

  // Music Stats
  async getMusicStats() {
    return this.fetch('/api/stats/music')
  }

  async updateMusicStats(data) {
    return this.fetch('/api/stats/music', {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  // Gaming Stats
  async getGamingStats() {
    return this.fetch('/api/stats/gaming')
  }

  async updateGamingStats(data) {
    return this.fetch('/api/stats/gaming', {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  // GitHub Stats
  async getGitHubStats() {
    return this.fetch('/api/stats/github')
  }

  async updateGitHubStats(data) {
    return this.fetch('/api/stats/github', {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  // Chess Stats
  async getChessStats() {
    return this.fetch('/api/stats/chess')
  }

  async updateChessStats(data) {
    return this.fetch('/api/stats/chess', {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  // Sync Services
  async syncSpotify() {
    return this.fetch('/api/sync/spotify', { method: 'POST' })
  }

  async syncSteam() {
    return this.fetch('/api/sync/steam', { method: 'POST' })
  }

  async syncGitHub() {
    return this.fetch('/api/sync/github', { method: 'POST' })
  }

  async syncChess() {
    return this.fetch('/api/sync/chess', { method: 'POST' })
  }

  // Activity
  async logActivity(platform, action, detail) {
    return this.fetch('/api/activity', {
      method: 'POST',
      body: JSON.stringify({ platform, action, detail }),
    })
  }

  // Config
  async getConfigs() {
    return this.fetch('/api/config')
  }

  async updateConfig(service, config) {
    return this.fetch(`/api/config/${service}`, {
      method: 'PUT',
      body: JSON.stringify(config),
    })
  }
}

export const api = new ApiService()
export default api
