import { BaseNode } from '@/components/editor/nodes/BaseNode'
import type { Node } from '@xyflow/react'
import type { StaticImageData } from 'next/image'

export const nodeTypes = {
  custom_node: BaseNode
}

export type BaseNodeProps<Config = {}, ExtraFields = {}> = Node<
  {
    label: string
    type: string
    icon: React.ReactNode | StaticImageData
    config: Config
  } & ExtraFields
>

export type GmailNodeProps = BaseNodeProps
export type GoogleDriveNodeData = BaseNodeProps
