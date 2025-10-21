import { API_ROUTES } from '@/src/constants'
import { Context } from 'hono'

interface GmailMessage {
  id: string
  threadId: string
  labelIds: string[]
  snippet: string
  historyId: string
  internalDate: string
  payload: {
    partId: string
    mimeType: string
    filename: string
    headers: Array<{
      name: string
      value: string
    }>
    body: {
      attachmentId?: string
      size: number
      data?: string
    }
    parts?: GmailMessage['payload'][]
  }
  sizeEstimate: number
}

interface MessagesListResponse {
  messages: Array<{ id: string; threadId: string }>
  nextPageToken?: string
  resultSizeEstimate: number
}

export const getEmails = async (c: Context) => {
  try {
    // Get access token from request headers (you should implement proper auth)
    const authHeader = c.req.header('Authorization')
    if (!authHeader) {
      return c.json({ error: 'Authorization header required' }, 401)
    }

    // Extract query parameters for efficient filtering
    const query = c.req.query('q') || 'is:unread' // Default to unread messages
    const maxResults = parseInt(c.req.query('maxResults') || '10')
    const pageToken = c.req.query('pageToken')
    const includeSpamTrash = c.req.query('includeSpamTrash') === 'true'

    // Build query parameters
    const queryParams = new URLSearchParams({
      q: query,
      maxResults: maxResults.toString(),
      includeSpamTrash: includeSpamTrash.toString()
    })

    if (pageToken) {
      queryParams.append('pageToken', pageToken)
    }

    // Get messages list with efficient querying
    const messagesUrl = `${
      API_ROUTES.GMAIL.GET_MESSAGES
    }?${queryParams.toString()}`
    const messagesRes = await fetch(messagesUrl, {
      headers: {
        Authorization: authHeader
      }
    })

    if (!messagesRes.ok) {
      const error = await messagesRes.text()
      return c.json({ error: `Gmail API error: ${error}` }, messagesRes.status)
    }

    const messagesList: MessagesListResponse = await messagesRes.json()

    if (!messagesList.messages || messagesList.messages.length === 0) {
      return c.json({
        message: 'No messages found',
        data: {
          messages: [],
          nextPageToken: messagesList.nextPageToken,
          resultSizeEstimate: messagesList.resultSizeEstimate
        }
      })
    }

    // Fetch multiple messages in parallel for better performance
    const messagePromises = messagesList.messages.map(async (messageRef) => {
      const messageUrl = `${API_ROUTES.GMAIL.GET_MESSAGE(
        messageRef.id
      )}?format=full`
      const messageRes = await fetch(messageUrl, {
        headers: {
          Authorization: authHeader
        }
      })

      if (!messageRes.ok) {
        console.error(`Failed to fetch message ${messageRef.id}`)
        return null
      }

      const message: GmailMessage = await messageRes.json()

      // Process attachments if they exist
      const processedMessage = await processMessageWithAttachments(
        message,
        authHeader
      )

      return processedMessage
    })

    // Wait for all messages to be fetched
    const messages = (await Promise.all(messagePromises)).filter(Boolean)

    return c.json({
      message: 'Success',
      data: {
        messages,
        nextPageToken: messagesList.nextPageToken,
        resultSizeEstimate: messagesList.resultSizeEstimate,
        query: query,
        maxResults: maxResults
      }
    })
  } catch (error) {
    console.error('Error fetching emails:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
}

// Helper function to process message attachments
async function processMessageWithAttachments(
  message: GmailMessage,
  authHeader: string
): Promise<any> {
  const processedMessage = { ...message }

  // Recursively process all parts for attachments
  const processParts = async (parts: GmailMessage['payload'][]) => {
    for (const part of parts) {
      if (part.body?.attachmentId) {
        try {
          // Fetch attachment data
          const attachmentUrl = API_ROUTES.GMAIL.GET_ATTACHMENT(
            message.id,
            part.body.attachmentId
          )
          const attachmentRes = await fetch(attachmentUrl, {
            headers: {
              Authorization: authHeader
            }
          })

          if (attachmentRes.ok) {
            const attachmentData = await attachmentRes.json()
            part.body.data = attachmentData.data
          }
        } catch (error) {
          console.error(
            `Failed to fetch attachment ${part.body.attachmentId}:`,
            error
          )
        }
      }

      // Recursively process nested parts
      if (part.parts) {
        await processParts(part.parts)
      }
    }
  }

  if (message.payload.parts) {
    await processParts(message.payload.parts)
  }

  return processedMessage
}
