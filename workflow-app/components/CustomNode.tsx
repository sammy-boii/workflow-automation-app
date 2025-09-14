'use client'

import { Handle, Position, NodeProps } from '@xyflow/react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Play,
  Settings,
  Zap,
  Database,
  Webhook,
  FileText,
  MoreHorizontal,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'

export interface CustomNodeData {
  label: string
  type: 'trigger' | 'action' | 'condition' | 'data' | 'webhook' | 'file'
  status?: 'idle' | 'running' | 'success' | 'error'
  description?: string
  icon?: React.ReactNode
}

const nodeTypeConfig = {
  trigger: {
    icon: <Play className="w-4 h-4" />,
    color: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400',
    glowColor: 'shadow-emerald-500/20',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
  },
  action: {
    icon: <Zap className="w-4 h-4" />,
    color: 'bg-blue-500/20 border-blue-500/30 text-blue-400',
    glowColor: 'shadow-blue-500/20',
    badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
  },
  condition: {
    icon: <Settings className="w-4 h-4" />,
    color: 'bg-amber-500/20 border-amber-500/30 text-amber-400',
    glowColor: 'shadow-amber-500/20',
    badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
  },
  data: {
    icon: <Database className="w-4 h-4" />,
    color: 'bg-purple-500/20 border-purple-500/30 text-purple-400',
    glowColor: 'shadow-purple-500/20',
    badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
  },
  webhook: {
    icon: <Webhook className="w-4 h-4" />,
    color: 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400',
    glowColor: 'shadow-cyan-500/20',
    badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
  },
  file: {
    icon: <FileText className="w-4 h-4" />,
    color: 'bg-slate-500/20 border-slate-500/30 text-slate-400',
    glowColor: 'shadow-slate-500/20',
    badgeColor: 'bg-slate-500/20 text-slate-400 border-slate-500/30'
  }
}

const statusConfig = {
  idle: {
    icon: <div className="w-2 h-2 rounded-full bg-gray-400" />,
    color: 'text-gray-400'
  },
  running: {
    icon: <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />,
    color: 'text-blue-400'
  },
  success: {
    icon: <CheckCircle2 className="w-3 h-3" />,
    color: 'text-emerald-400'
  },
  error: {
    icon: <AlertCircle className="w-3 h-3" />,
    color: 'text-red-400'
  }
}

export function CustomNode({ data, selected }: NodeProps<CustomNodeData>) {
  const config = nodeTypeConfig[data.type] || nodeTypeConfig.action
  const status = statusConfig[data.status || 'idle']

  return (
    <div className="relative group">
      {/* Glow effect */}
      <div className={`absolute -inset-1 rounded-xl bg-gradient-to-r from-transparent via-transparent to-transparent ${config.glowColor} blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <Card className={`
        relative w-64 p-4 rounded-xl border-2 transition-all duration-300
        ${config.color}
        ${selected ? 'ring-2 ring-white/20 scale-105' : ''}
        backdrop-blur-xl bg-black/20
        hover:scale-105 hover:shadow-2xl
        group-hover:border-white/40
        ${config.glowColor}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-white/10 backdrop-blur-sm">
              {data.icon || config.icon}
            </div>
            <div className="flex flex-col">
              <h3 className="font-semibold text-sm text-white/90 truncate">
                {data.label}
              </h3>
              <Badge
                variant="outline"
                className={`text-xs px-2 py-0.5 ${config.badgeColor} border-0`}
              >
                {data.type}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <div className={`flex items-center gap-1 ${status.color}`}>
              {status.icon}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10"
            >
              <MoreHorizontal className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Description */}
        {data.description && (
          <p className="text-xs text-white/60 mb-3 line-clamp-2">
            {data.description}
          </p>
        )}

        {/* Status indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${status.color.replace('text-', 'bg-')}`} />
            <span className={`text-xs font-medium ${status.color}`}>
              {data.status || 'idle'}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-white/30" />
            <div className="w-1 h-1 rounded-full bg-white/30" />
            <div className="w-1 h-1 rounded-full bg-white/30" />
          </div>
        </div>

        {/* Connection handles */}
        <Handle
          type="target"
          position={Position.Left}
          className="w-3 h-3 bg-white/20 border-2 border-white/40 hover:bg-white/40 transition-colors"
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        />
        <Handle
          type="source"
          position={Position.Right}
          className="w-3 h-3 bg-white/20 border-2 border-white/40 hover:bg-white/40 transition-colors"
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        />
      </Card>
    </div>
  )
}
