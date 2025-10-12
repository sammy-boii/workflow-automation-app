export interface NodeAction {
  id: string
  name: string
  description: string
  fields: NodeField[]
}

export interface NodeField {
  id: string
  name: string
  type:
    | 'text'
    | 'email'
    | 'password'
    | 'select'
    | 'textarea'
    | 'number'
    | 'boolean'
  label: string
  placeholder?: string
  required?: boolean
  options?: { value: string; label: string }[]
  defaultValue?: any
}

export interface NodeConfig {
  nodeType: string
  actions: NodeAction[]
}

// Gmail Node Configuration
export const GMAIL_CONFIG: NodeConfig = {
  nodeType: 'gmail_node',
  actions: [
    {
      id: 'send_email',
      name: 'Send Email',
      description: 'Send an email through Gmail',
      fields: [
        {
          id: 'to',
          name: 'to',
          type: 'email',
          label: 'To',
          placeholder: 'recipient@example.com',
          required: true
        },
        {
          id: 'subject',
          name: 'subject',
          type: 'text',
          label: 'Subject',
          placeholder: 'Email subject',
          required: true
        },
        {
          id: 'body',
          name: 'body',
          type: 'textarea',
          label: 'Message Body',
          placeholder: 'Enter your message here...',
          required: true
        },
        {
          id: 'priority',
          name: 'priority',
          type: 'select',
          label: 'Priority',
          options: [
            { value: 'normal', label: 'Normal' },
            { value: 'high', label: 'High' },
            { value: 'low', label: 'Low' }
          ],
          defaultValue: 'normal'
        }
      ]
    },
    {
      id: 'read_emails',
      name: 'Read Emails',
      description: 'Read emails from Gmail inbox',
      fields: [
        {
          id: 'query',
          name: 'query',
          type: 'text',
          label: 'Search Query',
          placeholder: 'is:unread from:example@email.com'
        },
        {
          id: 'max_results',
          name: 'max_results',
          type: 'number',
          label: 'Max Results',
          defaultValue: 10
        },
        {
          id: 'include_attachments',
          name: 'include_attachments',
          type: 'boolean',
          label: 'Include Attachments',
          defaultValue: false
        }
      ]
    }
  ]
}

// Google Drive Node Configuration
export const GOOGLE_DRIVE_CONFIG: NodeConfig = {
  nodeType: 'google_drive_node',
  actions: [
    {
      id: 'upload_file',
      name: 'Upload File',
      description: 'Upload a file to Google Drive',
      fields: [
        {
          id: 'file_path',
          name: 'file_path',
          type: 'text',
          label: 'File Path',
          placeholder: '/path/to/file.pdf',
          required: true
        },
        {
          id: 'folder_id',
          name: 'folder_id',
          type: 'text',
          label: 'Folder ID',
          placeholder: 'Optional folder ID'
        },
        {
          id: 'file_name',
          name: 'file_name',
          type: 'text',
          label: 'File Name',
          placeholder: 'Custom file name (optional)'
        }
      ]
    },
    {
      id: 'download_file',
      name: 'Download File',
      description: 'Download a file from Google Drive',
      fields: [
        {
          id: 'file_id',
          name: 'file_id',
          type: 'text',
          label: 'File ID',
          placeholder: 'Google Drive file ID',
          required: true
        },
        {
          id: 'download_path',
          name: 'download_path',
          type: 'text',
          label: 'Download Path',
          placeholder: '/path/to/download/location',
          required: true
        }
      ]
    },
    {
      id: 'list_files',
      name: 'List Files',
      description: 'List files in Google Drive',
      fields: [
        {
          id: 'folder_id',
          name: 'folder_id',
          type: 'text',
          label: 'Folder ID',
          placeholder: 'Optional folder ID to list files from'
        },
        {
          id: 'max_results',
          name: 'max_results',
          type: 'number',
          label: 'Max Results',
          defaultValue: 50
        },
        {
          id: 'file_type',
          name: 'file_type',
          type: 'select',
          label: 'File Type',
          options: [
            { value: 'all', label: 'All Files' },
            { value: 'pdf', label: 'PDF' },
            { value: 'image', label: 'Images' },
            { value: 'document', label: 'Documents' }
          ],
          defaultValue: 'all'
        }
      ]
    }
  ]
}

export const NODE_CONFIGS: Record<string, NodeConfig> = {
  gmail_node: GMAIL_CONFIG,
  google_drive_node: GOOGLE_DRIVE_CONFIG
}
