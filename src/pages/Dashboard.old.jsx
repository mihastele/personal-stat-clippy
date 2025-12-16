import { Music, Gamepad2, Github, Trophy, Activity } from 'lucide-react'
import StatCard from '../components/ui/StatCard'
import AreaChartComponent from '../components/charts/AreaChartComponent'
import { dashboardOverview, musicStats, gamingStats, githubStats, chessStats } from '../data/mockData'
import { formatNumber, formatDuration } from '../lib/utils'

const platformIcons = {
  spotify: Music,
  steam: Gamepad2,
  github: Github,
  chess: Trophy,
}

const platformColors = {
  spotify: 'text-green-400 bg-green-500/10',
  steam: 'text-blue-400 bg-blue-500/10',
  github: 'text-purple-400 bg-purple-500/10',
  chess: 'text-amber-400 bg-amber-500/10',
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
        <p className="text-dark-400">Welcome back! Here's your digital activity overview.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Hours Listened"
          value={formatDuration(musicStats.totalMinutesListened)}
          change={12.5}
          icon={Music}
          color="green"
        />
        <StatCard
          title="Gaming Hours"
          value={formatNumber(gamingStats.totalPlaytime) + 'h'}
          change={-8.2}
          icon={Gamepad2}
          color="primary"
        />
        <StatCard
          title="Contributions"
          value={formatNumber(githubStats.totalContributions)}
          change={23.1}
          icon={Github}
          color="purple"
        />
        <StatCard
          title="Chess Rating"
          value={chessStats.rating.rapid}
          change={5.6}
          icon={Trophy}
          color="amber"
        />
      </div>

      {/* Weekly Highlights & Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Highlights */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Weekly Activity</h2>
            <select className="bg-dark-700 border border-dark-600 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-primary-500">
              <option>This Week</option>
              <option>Last Week</option>
              <option>Last Month</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {dashboardOverview.weeklyHighlights.map((item, index) => {
              const Icon = platformIcons[item.platform.toLowerCase()] || Activity
              const colorClass = platformColors[item.platform.toLowerCase()] || 'text-primary-400 bg-primary-500/10'
              return (
                <div key={index} className="bg-dark-800/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-1.5 rounded-lg ${colorClass}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm text-dark-400">{item.platform}</span>
                  </div>
                  <p className="text-xl font-bold text-white">{item.value.toLocaleString()}</p>
                  <p className="text-xs text-dark-400">{item.metric}</p>
                </div>
              )
            })}
          </div>
          <AreaChartComponent
            data={musicStats.listeningHistory}
            dataKey="minutes"
            color="#10b981"
            gradientId="dashboardGradient"
            height={200}
          />
        </div>

        {/* Activity Feed */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-primary-400" />
            <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
          </div>
          <div className="space-y-4">
            {dashboardOverview.activityFeed.map((activity, index) => {
              const Icon = platformIcons[activity.platform] || Activity
              const colorClass = platformColors[activity.platform] || 'text-primary-400 bg-primary-500/10'
              return (
                <div key={index} className="flex gap-3">
                  <div className={`p-2 rounded-lg h-fit ${colorClass}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white">
                      <span className="text-dark-400">{activity.action}</span>{' '}
                      <span className="font-medium">{activity.detail}</span>
                    </p>
                    <p className="text-xs text-dark-500 mt-0.5">{activity.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Platform Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Spotify Card */}
        <div className="glass-card p-5 hover:border-green-500/30 transition-all cursor-pointer group">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-green-500/10 text-green-400 group-hover:bg-green-500/20 transition-all">
              <Music className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white">Spotify</p>
              <p className="text-xs text-dark-400">Music Streaming</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-dark-400">Top Artist</span>
              <span className="text-white font-medium">{musicStats.topArtists[0].name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-dark-400">Songs Played</span>
              <span className="text-white font-medium">{formatNumber(musicStats.totalSongs)}</span>
            </div>
          </div>
        </div>

        {/* Steam Card */}
        <div className="glass-card p-5 hover:border-blue-500/30 transition-all cursor-pointer group">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-all">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white">Steam</p>
              <p className="text-xs text-dark-400">Gaming Platform</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-dark-400">Top Game</span>
              <span className="text-white font-medium truncate ml-2">{gamingStats.topGames[0].name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-dark-400">Achievements</span>
              <span className="text-white font-medium">{formatNumber(gamingStats.achievementsUnlocked)}</span>
            </div>
          </div>
        </div>

        {/* GitHub Card */}
        <div className="glass-card p-5 hover:border-purple-500/30 transition-all cursor-pointer group">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition-all">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white">GitHub</p>
              <p className="text-xs text-dark-400">Development</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-dark-400">Current Streak</span>
              <span className="text-white font-medium">{githubStats.currentStreak} days</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-dark-400">Total Stars</span>
              <span className="text-white font-medium">{formatNumber(githubStats.totalStars)}</span>
            </div>
          </div>
        </div>

        {/* Chess.com Card */}
        <div className="glass-card p-5 hover:border-amber-500/30 transition-all cursor-pointer group">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20 transition-all">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white">Chess.com</p>
              <p className="text-xs text-dark-400">Online Chess</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-dark-400">Win Rate</span>
              <span className="text-white font-medium">{chessStats.winRate}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-dark-400">Games Played</span>
              <span className="text-white font-medium">{formatNumber(chessStats.totalGames)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
