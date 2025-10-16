'use client'

import { Handle, Position, NodeProps } from '@xyflow/react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import { Settings, Trash2 } from 'lucide-react'
import Image, { StaticImageData } from 'next/image'
import React, { useState } from 'react'
import { BaseNodeProps } from '@/types/node.types'
import { GmailSettingsSheet } from '../custom-nodes/gmail/GmailSettingsSheet'
import { GoogleDriveSettingsSheet } from '../custom-nodes/google-drive/GoogleDriveSettingsSheet'
import { NODE_TYPES } from '@/constants'
import { NODE_DEFINITIONS } from '@/constants/registry'

export function BaseNode({ data, id }: NodeProps<BaseNodeProps>) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const handleSettingsClick = () => {
    setIsSettingsOpen(true)
  }

  const node = NODE_DEFINITIONS[data.type]

  const handleSaveConfiguration = (nodeId: string, config: any) => {}

  return (
    <div className='relative group'>
      <div className='absolute -top-5 right-0 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 items-center'>
        <Button
          size='sm'
          variant='outline'
          className='h-6 w-6 p-0 bg-background/90 backdrop-blur-sm border-border/60 hover:bg-accent'
          onClick={handleSettingsClick}
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
            <div className='relative z-10'>
              {' '}
              <Image src={node.icon} alt={node.label} width={24} height={24} />
            </div>
          </div>
          <div className='flex-1 min-w-0'>
            <h3 className='font-semibold text-sm text-foreground truncate'>
              {node.label}
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
          className='w-6 h-6 bg-gradient-to-br from-gray-600 to-gray-700 border-2 border-white shadow-lg hover:from-gray-700 hover:to-gray-800 hover:scale-110 transition-all duration-200'
          style={{
            top: '50%',
            transform: 'translateY(-50%)',
            left: '-12px'
          }}
        />
        <Handle
          type='source'
          position={Position.Right}
          className='w-6 h-6 bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-white shadow-lg hover:from-gray-900 hover:to-black hover:scale-110 transition-all duration-200'
          style={{
            top: '50%',
            transform: 'translateY(-50%)',
            right: '-12px'
          }}
        />
      </Card>
    </div>
  )
}
