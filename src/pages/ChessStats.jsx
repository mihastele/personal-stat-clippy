import { Trophy, Target, Zap, Clock, Brain, Crown, Swords, TrendingUp } from 'lucide-react'
import StatCard from '../components/ui/StatCard'
import LineChartComponent from '../components/charts/LineChartComponent'
import ProgressBar from '../components/ui/ProgressBar'
import { chessStats } from '../data/mockData'
import { formatNumber } from '../lib/utils'

export default function ChessStats() {
  const ratingLines = [
    { dataKey: 'rapid', color: '#0ea5e9', name: 'Rapid' },
    { dataKey: 'blitz', color: '#8b5cf6', name: 'Blitz' },
    { dataKey: 'bullet', color: '#f59e0b', name: 'Bullet' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Chess Stats</h1>
          <p className="text-dark-400">Your Chess.com performance and ratings</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Trophy className="w-4 h-4" />
          Sync Chess.com
        </button>
      </div>

      {/* Rating Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-6 bg-gradient-to-br from-primary-500/10 to-primary-600/10 border-primary-500/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-xl bg-primary-500/20">
              <Clock className="w-5 h-5 text-primary-400" />
            </div>
            <span className="text-dark-400">Rapid</span>
          </div>
          <p className="text-3xl font-bold text-white">{chessStats.rating.rapid}</p>
          <p className="text-sm text-green-400 mt-1">+136 this year</p>
        </div>
        <div className="glass-card p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-xl bg-purple-500/20">
              <Zap className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-dark-400">Blitz</span>
          </div>
          <p className="text-3xl font-bold text-white">{chessStats.rating.blitz}</p>
          <p className="text-sm text-green-400 mt-1">+92 this year</p>
        </div>
        <div className="glass-card p-6 bg-gradient-to-br from-amber-500/10 to-amber-600/10 border-amber-500/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-xl bg-amber-500/20">
              <Target className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-dark-400">Bullet</span>
          </div>
          <p className="text-3xl font-bold text-white">{chessStats.rating.bullet}</p>
          <p className="text-sm text-green-400 mt-1">+107 this year</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Games"
          value={formatNumber(chessStats.totalGames)}
          change={5.6}
          icon={Swords}
          color="primary"
        />
        <StatCard
          title="Win Rate"
          value={chessStats.winRate + '%'}
          change={2.3}
          icon={Crown}
          color="green"
        />
        <StatCard
          title="Puzzle Rating"
          value={chessStats.puzzleRating}
          change={8.5}
          icon={Brain}
          color="purple"
        />
        <StatCard
          title="Puzzles Solved"
          value={formatNumber(chessStats.puzzlesSolved)}
          change={15.2}
          icon={Target}
          color="amber"
        />
      </div>

      {/* Rating History */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Rating Progress</h2>
        <LineChartComponent
          data={chessStats.ratingHistory}
          lines={ratingLines}
          height={300}
        />
      </div>

      {/* Game Results & Openings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Win/Loss/Draw */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Game Results</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-medium">Wins</span>
                <span className="text-green-400 font-bold">{chessStats.wins}</span>
              </div>
              <ProgressBar
                value={chessStats.wins}
                max={chessStats.totalGames}
                color="#10b981"
                showPercentage={false}
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-medium">Losses</span>
                <span className="text-red-400 font-bold">{chessStats.losses}</span>
              </div>
              <ProgressBar
                value={chessStats.losses}
                max={chessStats.totalGames}
                color="#ef4444"
                showPercentage={false}
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-medium">Draws</span>
                <span className="text-dark-400 font-bold">{chessStats.draws}</span>
              </div>
              <ProgressBar
                value={chessStats.draws}
                max={chessStats.totalGames}
                color="#64748b"
                showPercentage={false}
              />
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-dark-700">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-green-400">{((chessStats.wins / chessStats.totalGames) * 100).toFixed(1)}%</p>
                <p className="text-xs text-dark-400">Win Rate</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-400">{((chessStats.losses / chessStats.totalGames) * 100).toFixed(1)}%</p>
                <p className="text-xs text-dark-400">Loss Rate</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-dark-400">{((chessStats.draws / chessStats.totalGames) * 100).toFixed(1)}%</p>
                <p className="text-xs text-dark-400">Draw Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Opening Stats */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Top Openings</h2>
          <div className="space-y-3">
            {chessStats.openingStats.map((opening, index) => (
              <div key={index} className="p-4 bg-dark-800/50 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-medium text-white">{opening.name}</p>
                  <span className={`text-sm font-medium ${opening.winRate >= 50 ? 'text-green-400' : 'text-red-400'}`}>
                    {opening.winRate}% win
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ProgressBar
                    value={opening.winRate}
                    max={100}
                    color={opening.winRate >= 50 ? '#10b981' : '#ef4444'}
                    showPercentage={false}
                    size="sm"
                  />
                  <span className="text-xs text-dark-400 whitespace-nowrap">{opening.games} games</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Games */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Recent Games</h2>
        <div className="space-y-3">
          {chessStats.recentGames.map((game, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-dark-800/50 rounded-xl">
              <div className={`w-3 h-3 rounded-full ${
                game.result === 'win' ? 'bg-green-400' : 
                game.result === 'loss' ? 'bg-red-400' : 'bg-dark-400'
              }`} />
              <div className="flex-1">
                <p className="font-medium text-white">vs {game.opponent}</p>
                <p className="text-sm text-dark-400">Rating: {game.rating}</p>
              </div>
              <div className="text-right">
                <p className={`font-semibold capitalize ${
                  game.result === 'win' ? 'text-green-400' : 
                  game.result === 'loss' ? 'text-red-400' : 'text-dark-400'
                }`}>
                  {game.result}
                </p>
                <p className="text-xs text-dark-500">{game.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
