import { Music, Clock, Disc3, Users, Play, Heart } from 'lucide-react'
import StatCard from '../components/ui/StatCard'
import AreaChartComponent from '../components/charts/AreaChartComponent'
import PieChartComponent from '../components/charts/PieChartComponent'
import { musicStats } from '../data/mockData'
import { formatDuration, formatNumber } from '../lib/utils'

export default function MusicStats() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Music Stats</h1>
          <p className="text-dark-400">Your Spotify listening activity and insights</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Music className="w-4 h-4" />
          Sync Spotify
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Listening Time"
          value={formatDuration(musicStats.totalMinutesListened)}
          change={12.5}
          icon={Clock}
          color="green"
        />
        <StatCard
          title="Songs Played"
          value={formatNumber(musicStats.totalSongs)}
          change={8.3}
          icon={Disc3}
          color="primary"
        />
        <StatCard
          title="Unique Artists"
          value={formatNumber(musicStats.totalArtists)}
          change={15.2}
          icon={Users}
          color="purple"
        />
        <StatCard
          title="Top Genre"
          value={musicStats.topGenres[0].name}
          icon={Music}
          color="amber"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Listening History */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Listening History</h2>
          <AreaChartComponent
            data={musicStats.listeningHistory}
            dataKey="minutes"
            color="#10b981"
            gradientId="musicGradient"
            height={280}
          />
        </div>

        {/* Genre Distribution */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Genre Distribution</h2>
          <PieChartComponent data={musicStats.topGenres} height={280} />
        </div>
      </div>

      {/* Top Artists & Tracks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Artists */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Top Artists</h2>
          <div className="space-y-3">
            {musicStats.topArtists.map((artist, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-dark-800/50 rounded-xl hover:bg-dark-800 transition-all">
                <span className="text-lg font-bold text-dark-500 w-6">#{index + 1}</span>
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-12 h-12 rounded-lg object-cover bg-dark-700"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">{artist.name}</p>
                  <p className="text-sm text-dark-400">{artist.plays} plays</p>
                </div>
                <button className="p-2 text-dark-400 hover:text-green-400 transition-all">
                  <Play className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Top Tracks */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Top Tracks</h2>
          <div className="space-y-3">
            {musicStats.topTracks.map((track, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-dark-800/50 rounded-xl hover:bg-dark-800 transition-all">
                <span className="text-lg font-bold text-dark-500 w-6">#{index + 1}</span>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center">
                  <Disc3 className="w-6 h-6 text-green-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">{track.name}</p>
                  <p className="text-sm text-dark-400">{track.artist}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{track.plays}</p>
                  <p className="text-xs text-dark-400">plays</p>
                </div>
                <button className="p-2 text-dark-400 hover:text-red-400 transition-all">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recently Played */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Recently Played</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {musicStats.recentlyPlayed.map((track, index) => (
            <div key={index} className="bg-dark-800/50 rounded-xl p-4 hover:bg-dark-800 transition-all cursor-pointer group">
              <div className="w-full aspect-square rounded-lg bg-gradient-to-br from-green-500/10 to-purple-500/10 flex items-center justify-center mb-3 group-hover:from-green-500/20 group-hover:to-purple-500/20 transition-all">
                <Disc3 className="w-12 h-12 text-green-400" />
              </div>
              <p className="font-medium text-white truncate">{track.name}</p>
              <p className="text-sm text-dark-400 truncate">{track.artist}</p>
              <p className="text-xs text-dark-500 mt-1">{track.playedAt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
