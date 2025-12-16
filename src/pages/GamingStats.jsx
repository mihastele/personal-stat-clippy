import { Gamepad2, Clock, Trophy, Target, Flame, Star } from 'lucide-react'
import StatCard from '../components/ui/StatCard'
import AreaChartComponent from '../components/charts/AreaChartComponent'
import PieChartComponent from '../components/charts/PieChartComponent'
import ProgressBar from '../components/ui/ProgressBar'
import { gamingStats } from '../data/mockData'
import { formatNumber } from '../lib/utils'

export default function GamingStats() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Gaming Stats</h1>
          <p className="text-dark-400">Your Steam gaming activity and achievements</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Gamepad2 className="w-4 h-4" />
          Sync Steam
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Playtime"
          value={formatNumber(gamingStats.totalPlaytime) + 'h'}
          change={-8.2}
          icon={Clock}
          color="primary"
        />
        <StatCard
          title="Games Owned"
          value={gamingStats.totalGames}
          change={3.5}
          icon={Gamepad2}
          color="purple"
        />
        <StatCard
          title="Achievements"
          value={formatNumber(gamingStats.achievementsUnlocked)}
          change={12.8}
          icon={Trophy}
          color="amber"
        />
        <StatCard
          title="Perfect Games"
          value={gamingStats.perfectGames}
          change={25.0}
          icon={Star}
          color="green"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Playtime History */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Monthly Playtime</h2>
          <AreaChartComponent
            data={gamingStats.playtimeHistory}
            dataKey="hours"
            color="#0ea5e9"
            gradientId="gamingGradient"
            height={280}
          />
        </div>

        {/* Genre Breakdown */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Genre Breakdown</h2>
          <PieChartComponent 
            data={gamingStats.genreBreakdown.map(g => ({
              name: g.name,
              percentage: Math.round((g.hours / gamingStats.totalPlaytime) * 100),
              color: g.color
            }))} 
            height={280} 
          />
        </div>
      </div>

      {/* Top Games */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Top Games by Playtime</h2>
        <div className="space-y-4">
          {gamingStats.topGames.map((game, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-dark-800/50 rounded-xl hover:bg-dark-800 transition-all">
              <span className="text-xl font-bold text-dark-500 w-8">#{index + 1}</span>
              <img
                src={game.image}
                alt={game.name}
                className="w-16 h-16 rounded-lg object-cover bg-dark-700"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white text-lg">{game.name}</p>
                <p className="text-sm text-dark-400">{game.hours} hours played</p>
                <div className="mt-2">
                  <ProgressBar
                    value={game.achievements.unlocked}
                    max={game.achievements.total}
                    color="#f59e0b"
                    size="sm"
                    showPercentage={false}
                  />
                  <p className="text-xs text-dark-400 mt-1">
                    {game.achievements.unlocked}/{game.achievements.total} achievements
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-amber-400">
                  <Trophy className="w-4 h-4" />
                  <span className="font-medium">{Math.round((game.achievements.unlocked / game.achievements.total) * 100)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Sessions */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-orange-400" />
          <h2 className="text-lg font-semibold text-white">Recent Sessions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {gamingStats.recentGames.map((game, index) => (
            <div key={index} className="bg-dark-800/50 rounded-xl p-4 hover:bg-dark-800 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <Gamepad2 className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">{game.name}</p>
                  <p className="text-xs text-dark-400">{game.lastPlayed}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-dark-400">Session Time</span>
                <span className="text-white font-medium">{game.sessionTime} min</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
