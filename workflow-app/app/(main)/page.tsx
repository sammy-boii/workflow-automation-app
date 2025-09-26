'use client'

import { useCallback, useState } from 'react'
import {
  ReactFlow,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  Edge
} from '@xyflow/react'

import type {
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodeDrag,
  OnNodesChange
} from '@xyflow/react'

import { nodeTypes } from '@/types/node.types'

import gmailIcon from '@/public/gmail.png'
import driveIcon from '@/public/google-drive.png'
import { CUSTOM_NODE_TYPES } from '@/constants'

export default function App() {
  const initialNodes: Node[] = [
    {
      id: 'n1',
      type: 'custom_node',
      position: { x: 280, y: 160 },
      data: {
        type: CUSTOM_NODE_TYPES.GOOGLE_DRIVE,
        label: 'Google Drive',
        icon: driveIcon
      }
    },

    {
      id: 'n2',
      type: 'custom_node',
      position: { x: 480, y: 160 },
      data: {
        type: CUSTOM_NODE_TYPES.GMAIL,
        label: 'Gmail',
        icon: gmailIcon
      }
    }
  ]

  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState<Edge[]>([])

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  )
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  )
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  )

  const onNodeDrag: OnNodeDrag = (_, node) => {
    console.log('drag event', node.data)
  }

  return (
    <div className='w-full h-screen'>
      <ReactFlow
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodes={nodes}
        nodeTypes={nodeTypes}
        className='bg-background'
      >
        <Background gap={40} />
      </ReactFlow>
    </div>
  )
}
function setNodes(arg0: (nds: any) => Node[]): any {
  throw new Error('Function not implemented.')
}
