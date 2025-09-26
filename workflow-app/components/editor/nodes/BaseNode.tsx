'use client'

import { Handle, Position, NodeProps } from '@xyflow/react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import { Settings, Trash2 } from 'lucide-react'
import Image, { StaticImageData } from 'next/image'
import React from 'react'
import { BaseNodeProps } from '@/types/node.types'

export function BaseNode({ data }: NodeProps<BaseNodeProps>) {
  const renderIcon = () => {
    if (React.isValidElement(data.icon)) {
      return data.icon
    }
    if (data.icon && typeof data.icon === 'object') {
      return (
        <Image
          src={data.icon as StaticImageData}
          alt={data.label}
          width={24}
          height={24}
        />
      )
    }
  }

  return (
    <div className='relative group'>
      <div className='absolute -top-5 right-0 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 items-center'>
        <Button
          size='sm'
          variant='outline'
          className='h-6 w-6 p-0 bg-background/90 backdrop-blur-sm border-border/60 hover:bg-accent'
        >
          <Settings className='h-3.5 w-3.5' />
        </Button>
        <Button
          size='sm'
          variant='outline'
          className='h-6 w-6 p-0 bg-background/90 backdrop-blur-sm border-border/60 '
        >
          <Trash2 className='h-3.5 w-3.5' />
        </Button>
      </div>

      <Card
        className={`
        relative w-48 p-4 rounded-lg border transition-all duration-200
        bg-card/95 backdrop-blur-sm border-border/50
        hover:shadow-2xl hover:border-2
      `}
      >
        {/* Content */}
        <div className='flex items-center gap-3'>
          <div
            className={`p-3 rounded-xl 
      bg-gradient-to-br from-white/10 to-white/5 
      shadow-lg shadow-black/10 ring-1 ring-black/5
      aspect-square relative overflow-hidden
    `}
          >
            <div className='relative z-10'>{renderIcon()}</div>
          </div>
          <div className='flex-1 min-w-0'>
            <h3 className='font-semibold text-sm text-foreground truncate'>
              {data.label}
            </h3>
            <p className='text-xs text-muted-foreground capitalize font-medium'>
              Action
            </p>
          </div>
        </div>

        {/* Connection handles */}
        <Handle
          type='target'
          position={Position.Left}
          className='w-4 h-4 bg-gradient-to-br from-muted to-muted/80 border-2 border-border/60 hover:bg-accent hover:scale-110 transition-all duration-200 shadow-sm'
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        />
        <Handle
          type='source'
          position={Position.Right}
          className='w-4 h-4 bg-gradient-to-br from-muted to-muted/80 border-2 border-border/60 hover:bg-accent hover:scale-110 transition-all duration-200 shadow-sm'
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        />
      </Card>
    </div>
  )
}
