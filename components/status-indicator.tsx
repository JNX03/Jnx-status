import { CheckCircle, AlertTriangle, AlertCircle, Clock } from 'lucide-react'
import { cn } from "@/lib/utils"

type StatusIndicatorProps = {
  status: 'operational' | 'degraded' | 'down' | 'maintenance'
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
}

export function StatusIndicator({ status, size = 'md', showText = false }: StatusIndicatorProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  const statusConfig = {
    operational: { icon: CheckCircle, color: 'text-green-500', text: 'Operational' },
    degraded: { icon: AlertTriangle, color: 'text-yellow-500', text: 'Degraded' },
    down: { icon: AlertCircle, color: 'text-red-500', text: 'Down' },
    maintenance: { icon: Clock, color: 'text-blue-500', text: 'Maintenance' }
  }

  const { icon: Icon, color, text } = statusConfig[status]

  return (
    <div className="flex items-center space-x-2">
      <Icon className={cn(sizeClasses[size], color)} />
      {showText && <span className={cn("font-medium", color)}>{text}</span>}
    </div>
  )
}

