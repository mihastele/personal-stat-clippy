import { Github, GitCommit, Star, Users, Flame, GitPullRequest, GitBranch, Code2 } from 'lucide-react'
import StatCard from '../components/ui/StatCard'
import AreaChartComponent from '../components/charts/AreaChartComponent'
import BarChartComponent from '../components/charts/BarChartComponent'
import { githubStats } from '../data/mockData'
import { formatNumber } from '../lib/utils'

export default function DevStats() {
  const languageData = githubStats.topLanguages.map(lang => ({
    name: lang.name,
    percentage: lang.percentage,
    color: lang.color
  }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Developer Stats</h1>
          <p className="text-dark-400">Your GitHub activity and contributions</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Github className="w-4 h-4" />
          Sync GitHub
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Contributions"
          value={formatNumber(githubStats.totalContributions)}
          change={23.1}
          icon={GitCommit}
          color="purple"
        />
        <StatCard
          title="Repositories"
          value={githubStats.totalRepos}
          change={8.5}
          icon={GitBranch}
          color="primary"
        />
        <StatCard
          title="Total Stars"
          value={formatNumber(githubStats.totalStars)}
          change={15.3}
          icon={Star}
          color="amber"
        />
        <StatCard
          title="Followers"
          value={formatNumber(githubStats.totalFollowers)}
          change={12.0}
          icon={Users}
          color="green"
        />
      </div>

      {/* Streak Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-orange-500/20">
              <Flame className="w-8 h-8 text-orange-400" />
            </div>
            <div>
              <p className="text-dark-400 text-sm">Current Streak</p>
              <p className="text-4xl font-bold text-white">{githubStats.currentStreak} <span className="text-lg font-normal text-dark-400">days</span></p>
            </div>
          </div>
        </div>
        <div className="glass-card p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-purple-500/20">
              <Star className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <p className="text-dark-400 text-sm">Longest Streak</p>
              <p className="text-4xl font-bold text-white">{githubStats.longestStreak} <span className="text-lg font-normal text-dark-400">days</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contribution History */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Contribution History</h2>
          <AreaChartComponent
            data={githubStats.contributionHistory}
            dataKey="contributions"
            color="#8b5cf6"
            gradientId="githubGradient"
            height={280}
          />
        </div>

        {/* Top Languages */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Top Languages</h2>
          <div className="space-y-4">
            {languageData.map((lang, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: lang.color }}
                    />
                    <span className="text-white font-medium">{lang.name}</span>
                  </div>
                  <span className="text-dark-400 text-sm">{lang.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-dark-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Repositories */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Top Repositories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {githubStats.topRepos.map((repo, index) => (
            <div key={index} className="bg-dark-800/50 rounded-xl p-4 hover:bg-dark-800 transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-purple-400" />
                  <p className="font-semibold text-white">{repo.name}</p>
                </div>
                <span className="px-2 py-1 text-xs rounded-lg bg-dark-700 text-dark-300">{repo.language}</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-dark-400">
                  <Star className="w-4 h-4 text-amber-400" />
                  <span>{repo.stars}</span>
                </div>
                <div className="flex items-center gap-1 text-dark-400">
                  <GitBranch className="w-4 h-4 text-green-400" />
                  <span>{repo.forks} forks</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {githubStats.recentActivity.map((activity, index) => {
            const icons = {
              commit: GitCommit,
              pr: GitPullRequest,
              issue: Code2,
            }
            const colors = {
              commit: 'text-green-400 bg-green-500/10',
              pr: 'text-purple-400 bg-purple-500/10',
              issue: 'text-amber-400 bg-amber-500/10',
            }
            const Icon = icons[activity.type]
            
            return (
              <div key={index} className="flex items-center gap-4 p-3 bg-dark-800/50 rounded-xl">
                <div className={`p-2 rounded-lg ${colors[activity.type]}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white">
                    <span className="font-medium">{activity.repo}</span>
                    <span className="text-dark-400 mx-2">•</span>
                    <span className="text-dark-300">{activity.message}</span>
                  </p>
                </div>
                <span className="text-xs text-dark-500">{activity.time}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
