import { Hono } from 'hono'
import { BACKEND_BASE_URL } from '../lib/constants'

const authRoutes = new Hono()

authRoutes.get('/google', async (c) => {
  try {
    const state = crypto.randomUUID() // CSRF protection

    const googleAuthUrl = new URL(
      'https://accounts.google.com/o/oauth2/v2/auth'
    )
    googleAuthUrl.searchParams.append(
      'client_id',
      process.env.GOOGLE_CLIENT_ID as string
    )
    googleAuthUrl.searchParams.append(
      'redirect_uri',
      `${BACKEND_BASE_URL}/api/auth/google/callback`
    )
    googleAuthUrl.searchParams.append('response_type', 'code')
    googleAuthUrl.searchParams.append('scope', 'openid email profile')
    googleAuthUrl.searchParams.append('state', state)
    googleAuthUrl.searchParams.append('access_type', 'offline')
    googleAuthUrl.searchParams.append('prompt', 'consent')

    return c.redirect(googleAuthUrl.toString())
  } catch (error) {
    return c.json(
      {
        success: false,
        message: 'Failed to initiate Google OAuth',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      500
    )
  }
})

authRoutes.post('/google/callback', (c) => {
  return c.json({ message: 'Hello from auth routes' })
})

export default authRoutes
