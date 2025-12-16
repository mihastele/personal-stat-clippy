import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-dark-800 border border-dark-600 rounded-lg px-3 py-2 shadow-xl">
        <p className="text-sm font-medium text-white">{payload[0].name}</p>
        <p className="text-xs text-dark-400">{payload[0].value}%</p>
      </div>
    )
  }
  return null
}

export default function PieChartComponent({ data, height = 250 }) {
  return (
    <div className="flex items-center gap-6">
      <ResponsiveContainer width="50%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="percentage"
            nameKey="name"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      
      <div className="flex-1 space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div 
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white truncate">{item.name}</p>
            </div>
            <p className="text-sm font-medium text-dark-400">{item.percentage}%</p>
          </div>
        ))}
      </div>
    </div>
  )
}
