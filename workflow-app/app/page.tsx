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
  },
  {
    id: 'condition-1',
    type: 'customNode',
    position: { x: 700, y: 100 },
    data: {
      label: 'Check Condition',
      type: 'condition',
      description: 'Evaluates if data meets specific criteria',
      status: 'idle'
    }
  },
  {
    id: 'data-1',
    type: 'customNode',
    position: { x: 1000, y: 50 },
    data: {
      label: 'Save to Database',
      type: 'data',
      description: 'Stores processed data in the database',
      status: 'idle'
    }
  },
  {
    id: 'webhook-1',
    type: 'customNode',
    position: { x: 1000, y: 150 },
    data: {
      label: 'Send Notification',
      type: 'webhook',
      description: 'Sends notification to external service',
      status: 'idle'
    }
  },
  {
    id: 'file-1',
    type: 'customNode',
    position: { x: 1000, y: 250 },
    data: {
      label: 'Generate Report',
      type: 'file',
      description: 'Creates a PDF report of the processed data',
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
  },
  {
    id: 'condition-data',
    source: 'condition-1',
    target: 'data-1',
    animated: true
  },
  {
    id: 'condition-webhook',
    source: 'condition-1',
    target: 'webhook-1',
    animated: true
  },
  {
    id: 'condition-file',
    source: 'condition-1',
    target: 'file-1',
    animated: true
  }
]

export default function App() {
  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState(initialEdges)

  const onNodesChange: OnNodesChange = useCallback(
    (changes) =>
      setNodes(
        (nodesSnapshot) =>
          applyNodeChanges(changes, nodesSnapshot) as Node<CustomNodeData>[]
      ),
    []
  )
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  )
  const onConnect: OnConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  )

  return (
    <div className='w-full h-screen'>
      <div className='absolute top-4 right-4 z-10'>
        <AnimatedThemeToggler />
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className='bg-background'
      >
        <Background gap={40} />
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            const type = (node.data as CustomNodeData)?.type
            switch (type) {
              case 'trigger':
                return '#10b981'
              case 'action':
                return '#3b82f6'
              case 'condition':
                return '#f59e0b'
              case 'data':
                return '#8b5cf6'
              case 'webhook':
                return '#06b6d4'
              case 'file':
                return '#64748b'
              default:
                return '#6b7280'
            }
          }}
        />
      </ReactFlow>
    </div>
  )
}
