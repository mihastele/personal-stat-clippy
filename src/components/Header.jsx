import { Bell, Search, User } from 'lucide-react'
import { userProfile } from '../data/mockData'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 h-16 bg-dark-900/80 backdrop-blur-xl border-b border-dark-700/50">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
            <input
              type="text"
              placeholder="Search stats, games, artists..."
              className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-xl text-sm text-white placeholder-dark-400 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/25 transition-all"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-dark-400 hover:text-white hover:bg-dark-800 rounded-xl transition-all">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-3 pl-4 border-l border-dark-700">
            <div className="text-right">
              <p className="text-sm font-medium text-white">{userProfile.name}</p>
              <p className="text-xs text-dark-400">@{userProfile.username}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center overflow-hidden">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
