'use client'

import { useState, useCallback } from 'react'
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  Node,
  Edge,
  Background,
  Controls,
  MiniMap
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { nodeTypes } from '@/types/node.types'
import type { CustomNodeData } from '@/components/CustomNode'
import { AnimatedThemeToggler } from '@/components/magicui/animated-theme-toggler'

const initialNodes: Node<CustomNodeData>[] = [
  {
    id: 'trigger-1',
    type: 'customNode',
    position: { x: 100, y: 100 },
    data: {
      label: 'Webhook Trigger',
      type: 'trigger',
      description: 'Receives HTTP requests and triggers the workflow',
      status: 'idle'
    }
  },
  {
    id: 'action-1',
    type: 'customNode',
    position: { x: 400, y: 100 },
    data: {
      label: 'Process Data',
      type: 'action',
      description: 'Transforms and validates incoming data',
      status: 'idle'
    }
  }
]

const initialEdges: Edge[] = [
  {
    id: 'trigger-action',
    source: 'trigger-1',
    target: 'action-1',
    animated: true
  },
  {
    id: 'action-condition',
    source: 'action-1',
    target: 'condition-1',
    animated: true
  }
]

export default function App() {
  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState(initialEdges)

  return (
    <div className='w-full h-screen'>
      <div className='absolute top-4 right-4 z-10'>
        <AnimatedThemeToggler />
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        className='bg-background'
      >
        <Background gap={40} />
      </ReactFlow>
    </div>
  )
}
