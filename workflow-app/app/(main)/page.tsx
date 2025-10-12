'use client'

import { useCallback, useState } from 'react'
import {
  ReactFlow,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  Edge,
  EdgeTypes,
  ConnectionLineType
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
    (connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            type: 'smoothstep',
            style: {
              strokeWidth: 2,
              stroke: '#9ca3af'
            },
            markerEnd: {
              type: 'arrowclosed',
              color: '#9ca3af',
              width: 12,
              height: 12
            }
          },
          eds
        )
      ),
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
        edges={edges}
        nodeTypes={nodeTypes}
        className='bg-background'
        connectionLineType={ConnectionLineType.Bezier}
        defaultEdgeOptions={{
          type: 'smoothstep',
          style: {
            strokeWidth: 2,
            stroke: '#9ca3af'
          },
          markerEnd: {
            type: 'arrowclosed',
            color: '#9ca3af',
            width: 12,
            height: 12
          }
        }}
        fitView
      >
        <Background gap={40} />
      </ReactFlow>
    </div>
  )
}
