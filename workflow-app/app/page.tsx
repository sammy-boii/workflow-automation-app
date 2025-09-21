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
  Background
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { nodeTypes } from '@/types/node.types'
import type { CustomNodeData } from '@/components/CustomNode'
;``
const initialNodes: Node<CustomNodeData>[] = [
  {
    id: 'n1',
    type: 'customNode',
    position: { x: 100, y: 100 },
    data: {
      label: 'Webhook Trigger',
      type: 'trigger',
      description: 'Receives HTTP requests and triggers the workflow',
      status: 'running'
    }
  },
  {
    id: 'n2',
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
    id: 'e1',
    source: 'n1',
    target: 'n2',
    animated: true
  },
  {
    id: 'e2',
    source: 'n2',
    target: 'n3',
    animated: true
  }
]

export default function App() {
  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState(initialEdges)

  return (
    <div className='w-full h-screen'>
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
