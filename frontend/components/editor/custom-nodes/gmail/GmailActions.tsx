import { NodeAction } from '@/types/node.types'
import { Mail, Search } from 'lucide-react'

export const GMAIL_ACTIONS: NodeAction[] = [
  {
    id: 'send_email',
    label: 'Send Email',
    description: 'Send an email through Gmail',
    icon: Mail,
    configForm: <></>
  },
  {
    id: 'read_email',
    label: 'Read Emails',
    description: 'Read emails from Gmail inbox',
    icon: Search,
    configForm: <></>
  }
]
