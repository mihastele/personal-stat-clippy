import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '../../lib/utils'

export default function StatCard({ title, value, change, icon: Icon, color = 'primary' }) {
  const isPositive = change >= 0
  
  const colorClasses = {
    primary: 'from-primary-500/20 to-primary-600/20 border-primary-500/30',
    purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
    green: 'from-green-500/20 to-green-600/20 border-green-500/30',
    amber: 'from-amber-500/20 to-amber-600/20 border-amber-500/30',
    red: 'from-red-500/20 to-red-600/20 border-red-500/30',
  }
  
  const iconColorClasses = {
    primary: 'text-primary-400',
    purple: 'text-purple-400',
    green: 'text-green-400',
    amber: 'text-amber-400',
    red: 'text-red-400',
  }

  return (
    <div className={cn(
      'stat-card bg-gradient-to-br border',
      colorClasses[color]
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className={cn(
          'p-3 rounded-xl bg-dark-800/50',
          iconColorClasses[color]
        )}>
          <Icon className="w-6 h-6" />
        </div>
        {change !== undefined && (
          <div className={cn(
            'flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-lg',
            isPositive ? 'text-green-400 bg-green-500/10' : 'text-red-400 bg-red-500/10'
          )}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <p className="text-dark-400 text-sm mb-1">{title}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  )
}
