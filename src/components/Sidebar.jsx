import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Music, 
  Gamepad2, 
  Github, 
  Trophy,
  FileBarChart,
  Settings,
  TrendingUp
} from 'lucide-react'
import { cn } from '../lib/utils'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/music', icon: Music, label: 'Music Stats' },
  { to: '/gaming', icon: Gamepad2, label: 'Gaming' },
  { to: '/dev', icon: Github, label: 'Developer' },
  { to: '/chess', icon: Trophy, label: 'Chess' },
  { to: '/reports', icon: FileBarChart, label: 'Reports' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-dark-800/80 backdrop-blur-xl border-r border-dark-700/50 z-50">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold gradient-text">StatClippy</h1>
            <p className="text-xs text-dark-400">Your Digital Life</p>
          </div>
        </div>
        
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                  isActive
                    ? 'bg-gradient-to-r from-primary-500/20 to-purple-500/20 text-white border border-primary-500/30'
                    : 'text-dark-400 hover:text-white hover:bg-dark-700/50'
                )
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="glass-card p-4">
          <p className="text-sm text-dark-400 mb-2">Connected Services</p>
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center" title="Spotify">
              <Music className="w-4 h-4 text-green-500" />
            </div>
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center" title="Steam">
              <Gamepad2 className="w-4 h-4 text-blue-500" />
            </div>
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center" title="GitHub">
              <Github className="w-4 h-4 text-purple-500" />
            </div>
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center" title="Chess.com">
              <Trophy className="w-4 h-4 text-amber-500" />
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
