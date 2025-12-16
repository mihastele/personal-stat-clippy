import { useState } from 'react'
import { FileBarChart, Download, Share2, Calendar, Filter, Music, Gamepad2, Github, Trophy } from 'lucide-react'
import { musicStats, gamingStats, githubStats, chessStats } from '../data/mockData'
import { formatNumber, formatDuration } from '../lib/utils'

const reportTypes = [
  { id: 'all', label: 'All Platforms', icon: FileBarChart },
  { id: 'music', label: 'Music', icon: Music },
  { id: 'gaming', label: 'Gaming', icon: Gamepad2 },
  { id: 'dev', label: 'Developer', icon: Github },
  { id: 'chess', label: 'Chess', icon: Trophy },
]

const timeRanges = [
  { id: 'week', label: 'This Week' },
  { id: 'month', label: 'This Month' },
  { id: 'year', label: 'This Year' },
  { id: 'all', label: 'All Time' },
]

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState('all')
  const [selectedRange, setSelectedRange] = useState('month')

  const generateReportData = () => {
    const data = {
      music: {
        title: 'Music Listening Report',
        stats: [
          { label: 'Total Listening Time', value: formatDuration(musicStats.totalMinutesListened) },
          { label: 'Songs Played', value: formatNumber(musicStats.totalSongs) },
          { label: 'Unique Artists', value: formatNumber(musicStats.totalArtists) },
          { label: 'Top Genre', value: musicStats.topGenres[0].name },
          { label: 'Top Artist', value: musicStats.topArtists[0].name },
          { label: 'Most Played Song', value: musicStats.topTracks[0].name },
        ],
      },
      gaming: {
        title: 'Gaming Activity Report',
        stats: [
          { label: 'Total Playtime', value: formatNumber(gamingStats.totalPlaytime) + ' hours' },
          { label: 'Games Played', value: gamingStats.totalGames },
          { label: 'Achievements Unlocked', value: formatNumber(gamingStats.achievementsUnlocked) },
          { label: 'Perfect Games', value: gamingStats.perfectGames },
          { label: 'Top Game', value: gamingStats.topGames[0].name },
          { label: 'Favorite Genre', value: gamingStats.genreBreakdown[0].name },
        ],
      },
      dev: {
        title: 'Developer Activity Report',
        stats: [
          { label: 'Total Contributions', value: formatNumber(githubStats.totalContributions) },
          { label: 'Repositories', value: githubStats.totalRepos },
          { label: 'Total Stars', value: formatNumber(githubStats.totalStars) },
          { label: 'Current Streak', value: githubStats.currentStreak + ' days' },
          { label: 'Top Language', value: githubStats.topLanguages[0].name },
          { label: 'Followers', value: formatNumber(githubStats.totalFollowers) },
        ],
      },
      chess: {
        title: 'Chess Performance Report',
        stats: [
          { label: 'Rapid Rating', value: chessStats.rating.rapid },
          { label: 'Total Games', value: formatNumber(chessStats.totalGames) },
          { label: 'Win Rate', value: chessStats.winRate + '%' },
          { label: 'Puzzle Rating', value: chessStats.puzzleRating },
          { label: 'Puzzles Solved', value: formatNumber(chessStats.puzzlesSolved) },
          { label: 'Best Opening', value: chessStats.openingStats[0].name },
        ],
      },
    }
    return data
  }

  const reportData = generateReportData()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Reports</h1>
          <p className="text-dark-400">Generate and share your personalized activity reports</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export PDF
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Share Report
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2 bg-dark-800 rounded-xl p-1">
          {reportTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedReport(type.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedReport === type.id
                  ? 'bg-primary-500 text-white'
                  : 'text-dark-400 hover:text-white hover:bg-dark-700'
              }`}
            >
              <type.icon className="w-4 h-4" />
              {type.label}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-2 bg-dark-800 rounded-xl p-1">
          {timeRanges.map((range) => (
            <button
              key={range.id}
              onClick={() => setSelectedRange(range.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedRange === range.id
                  ? 'bg-dark-700 text-white'
                  : 'text-dark-400 hover:text-white'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Report Preview */}
      <div className="glass-card p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold gradient-text mb-2">
            {selectedReport === 'all' ? 'Complete Activity Report' : reportData[selectedReport]?.title}
          </h2>
          <p className="text-dark-400">Generated on {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>

        {selectedReport === 'all' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(reportData).map(([key, section]) => (
              <div key={key} className="bg-dark-800/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">{section.title}</h3>
                <div className="space-y-3">
                  {section.stats.slice(0, 4).map((stat, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-dark-400">{stat.label}</span>
                      <span className="text-white font-medium">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="bg-dark-800/50 rounded-xl p-6">
              <div className="grid grid-cols-2 gap-4">
                {reportData[selectedReport]?.stats.map((stat, index) => (
                  <div key={index} className="p-4 bg-dark-900/50 rounded-lg">
                    <p className="text-dark-400 text-sm mb-1">{stat.label}</p>
                    <p className="text-xl font-bold text-white">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Share Options */}
        <div className="mt-8 pt-8 border-t border-dark-700">
          <h3 className="text-lg font-semibold text-white mb-4 text-center">Share Your Report</h3>
          <div className="flex justify-center gap-4">
            <button className="px-6 py-3 bg-[#1DA1F2]/10 text-[#1DA1F2] rounded-xl font-medium hover:bg-[#1DA1F2]/20 transition-all">
              Twitter
            </button>
            <button className="px-6 py-3 bg-[#0A66C2]/10 text-[#0A66C2] rounded-xl font-medium hover:bg-[#0A66C2]/20 transition-all">
              LinkedIn
            </button>
            <button className="px-6 py-3 bg-dark-700 text-white rounded-xl font-medium hover:bg-dark-600 transition-all">
              Copy Link
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 text-center">
          <Music className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">{formatDuration(musicStats.totalMinutesListened)}</p>
          <p className="text-sm text-dark-400">Listening Time</p>
        </div>
        <div className="glass-card p-4 text-center">
          <Gamepad2 className="w-8 h-8 text-blue-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">{formatNumber(gamingStats.totalPlaytime)}h</p>
          <p className="text-sm text-dark-400">Gaming Time</p>
        </div>
        <div className="glass-card p-4 text-center">
          <Github className="w-8 h-8 text-purple-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">{formatNumber(githubStats.totalContributions)}</p>
          <p className="text-sm text-dark-400">Contributions</p>
        </div>
        <div className="glass-card p-4 text-center">
          <Trophy className="w-8 h-8 text-amber-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">{chessStats.rating.rapid}</p>
          <p className="text-sm text-dark-400">Chess Rating</p>
        </div>
      </div>
    </div>
  )
}
