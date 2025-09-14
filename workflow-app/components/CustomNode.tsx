'use client'

import { Handle, Position, NodeProps } from '@xyflow/react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Play,
  Settings,
  Zap,
  Database,
  Webhook,
  FileText,
  Trash
} from 'lucide-react'

export interface CustomNodeData extends Record<string, unknown> {
  label: string
  type: 'trigger' | 'action' | 'condition' | 'data' | 'webhook' | 'file'
  status?: 'idle' | 'running' | 'success' | 'error'
  description?: string
  icon?: React.ReactNode
}

const nodeTypeConfig = {
  trigger: {
    icon: <Play className="w-4 h-4" />,
    color: 'text-emerald-600 dark:text-emerald-400',
    borderColor: 'border-emerald-600 dark:border-emerald-400',
    shadowColor: 'shadow-emerald-600/20 dark:shadow-emerald-400/20',
  },
  action: {
    icon: <Zap className="w-4 h-4" />,
    color: 'text-blue-600 dark:text-blue-400',
    borderColor: 'border-blue-600 dark:border-blue-400',
    shadowColor: 'shadow-blue-600/20 dark:shadow-blue-400/20'
  },
  condition: {
    icon: <Settings className="w-4 h-4" />,
    color: 'text-amber-600 dark:text-amber-400',
    borderColor: 'border-amber-600 dark:border-amber-400',
    shadowColor: 'shadow-amber-600/20 dark:shadow-amber-400/20'
  },
  data: {
    icon: <Database className="w-4 h-4" />,
    color: 'text-purple-600 dark:text-purple-400',
    borderColor: 'border-purple-600 dark:border-purple-400',
    shadowColor: 'shadow-purple-600/20 dark:shadow-purple-400/20'
  },
  webhook: {
    icon: <Webhook className="w-4 h-4" />,
    color: 'text-cyan-600 dark:text-cyan-400',
    borderColor: 'border-cyan-600 dark:border-cyan-400',
    shadowColor: 'shadow-cyan-600/20 dark:shadow-cyan-400/20'
  },
  file: {
    icon: <FileText className="w-4 h-4" />,
    color: 'text-slate-600 dark:text-slate-400',
    borderColor: 'border-slate-600 dark:border-slate-400',
    shadowColor: 'shadow-slate-600/20 dark:shadow-slate-400/20'
  }
}


export function CustomNode({ data, selected }: NodeProps) {
  const nodeData = data as CustomNodeData
  const config = nodeTypeConfig[nodeData.type] || nodeTypeConfig.action

  return (
    <div className="relative group">
      {/* Hover-revealed action buttons */}
      <div className="absolute -top-2 -right-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Button
          size="sm"
          variant="outline"
          className="h-6 w-6 p-0 bg-background/90 backdrop-blur-sm border-border/60 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
          onClick={(e) => {
            e.stopPropagation()
            // Handle settings click
            console.log('Settings clicked')
          }}
        >
          <Settings className="h-3 w-3" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="h-6 w-6 p-0 bg-background/90 backdrop-blur-sm border-border/60 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
          onClick={(e) => {
            e.stopPropagation()
            // Handle delete click
            console.log('Delete clicked')
          }}
        >
          <Trash className="h-3 w-3" />
        </Button>
      </div>

      <Card className={`
        relative w-48 p-4 rounded-lg border transition-all duration-200
        bg-card/95 backdrop-blur-sm
        hover:shadow-lg hover:scale-[1.02]
        border-border/50
        hover:${config.borderColor} hover:${config.shadowColor}
        hover:shadow-2xl hover:border-2
      `}>
        {/* Content */}
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl bg-gradient-to-br from-muted/60 to-muted/40 shadow-inner ${config.color} relative overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl"></div>
            <div className="relative z-10">
              {nodeData.icon || config.icon}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm text-foreground truncate">
              {nodeData.label}
            </h3>
            <p className="text-xs text-muted-foreground capitalize font-medium">
              {nodeData.type}
            </p>
          </div>
        </div>

        {/* Connection handles */}
        <Handle
          type="target"
          position={Position.Left}
          className="w-4 h-4 bg-gradient-to-br from-muted to-muted/80 border-2 border-border/60 hover:bg-accent hover:scale-110 transition-all duration-200 shadow-sm"
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        />
        <Handle
          type="source"
          position={Position.Right}
          className="w-4 h-4 bg-gradient-to-br from-muted to-muted/80 border-2 border-border/60 hover:bg-accent hover:scale-110 transition-all duration-200 shadow-sm"
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        />
      </Card>
    </div>
  )
}
