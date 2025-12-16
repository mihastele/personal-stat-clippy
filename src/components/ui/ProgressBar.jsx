import { cn } from '../../lib/utils'

export default function ProgressBar({ value, max = 100, color = '#0ea5e9', label, showPercentage = true, size = 'md' }) {
  const percentage = Math.min((value / max) * 100, 100)
  
  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  }

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-dark-300">{label}</span>
          {showPercentage && (
            <span className="text-sm font-medium text-white">{percentage.toFixed(0)}%</span>
          )}
        </div>
      )}
      <div className={cn('w-full bg-dark-700 rounded-full overflow-hidden', sizeClasses[size])}>
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ 
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  )
}
