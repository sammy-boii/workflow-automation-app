import { Context } from 'hono'
import { AppError } from '../types'
import { API_ROUTES } from '../constants'

// Recursively extract message body and attachments
export async function extractGmailMessageContent(
  messageId: string,
  payload: any,
  token: string
) {
  if (!payload) return { body: '', attachments: [], inlineImages: [] }

  let body = ''
  let attachments: { filename: string; mimeType: string; data: string }[] = []
  let inlineImages: { cid: string; mimeType: string; data: string }[] = []

  if (payload.body?.data) {
    body = decodeBase64(payload.body.data)
  }

  if (payload.parts?.length) {
    for (const part of payload.parts) {
      const mime = part.mimeType

      // Text content
      if (
        !body &&
        (mime === 'text/html' || mime === 'text/plain') &&
        part.body?.data
      ) {
        body = decodeBase64(part.body.data)
      }

      // Attachment (has filename)
      if (part.filename && part.body?.attachmentId) {
        try {
          const res = await fetch(
            API_ROUTES.GMAIL.GET_ATTACHMENT(messageId, part.body.attachmentId),
            {
              headers: { Authorization: `Bearer ${token}` }
            }
          )
          const data = await res.arrayBuffer()
          const base64Data = Buffer.from(data).toString('base64')

          // Check if it's inline
          const isInline = part.headers?.some(
            (h: any) =>
              h.name.toLowerCase() === 'content-disposition' &&
              h.value.includes('inline')
          )
          const cidHeader = part.headers?.find(
            (h: any) => h.name.toLowerCase() === 'content-id'
          )?.value

          if (isInline && cidHeader) {
            inlineImages.push({
              cid: cidHeader.replace(/[<>]/g, ''),
              mimeType: mime,
              data: base64Data
            })
          } else {
            attachments.push({
              filename: part.filename,
              mimeType: mime,
              data: base64Data
            })
          }
        } catch (err) {
          console.error(`Failed to fetch attachment ${part.filename}`, err)
        }
      }

      // Recurse into nested parts
      if (part.parts?.length) {
        const nested = await extractGmailMessageContent(messageId, part, token)
        if (!body && nested.body) body = nested.body
        attachments = attachments.concat(nested.attachments)
        inlineImages = inlineImages.concat(nested.inlineImages)
      }
    }
  }

  return { body, attachments, inlineImages }
}

export function decodeBase64(data: string) {
  if (!data) return ''
  const base64 = data.replace(/-/g, '+').replace(/_/g, '/')
  try {
    return decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
  } catch {
    return atob(base64)
  }
}

export const tryCatch = <T>(fn: (c: Context) => Promise<T>) => {
  return async (c: Context) => {
    try {
      const result = await fn(c)

      // if result is alr a Response obj, return it directly
      if (result instanceof Response) {
        return result
      }

      return c.json({
        data: result
      })
    } catch (err) {
      if (err instanceof AppError)
        return c.json(
          {
            error: err.message,
            details: err.details ?? ''
          },
          err.statusCode
        )

      return c.json(
        {
          error: err instanceof Error ? err.message : 'Internal server error'
        },
        500
      )
    }
  }
}

const a = new AppError('Gelo', 100)
