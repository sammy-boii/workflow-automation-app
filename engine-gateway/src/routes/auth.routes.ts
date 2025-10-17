import { Hono } from 'hono'
import { BACKEND_BASE_URL } from '../lib/constants'
import { googleAuth } from '@hono/oauth-providers/google'

const authRoutes = new Hono()

// handles both /google and /google/callback
authRoutes.use(
  '/google/*',
  googleAuth({
    client_id: Bun.env.GOOGLE_CLIENT_ID,
    client_secret: Bun.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: `${BACKEND_BASE_URL}/api/auth/google/callback`,
    scope: ['openid', 'email', 'profile']
  })
)

// runs after successful authentication
authRoutes.get('/google/callback', (c) => {
  const user = c.get('user-google')

  if (!user) {
    return c.json(
      {
        message: 'Unauthorized',
        error: 'No user found'
      },
      401
    )
  }

  console.log(
    c.get('granted-scopes'),
    c.get('token'),
    c.get('user-google'),
    c.get('refresh-token')
  )

  return c.json({
    message: 'Successfully authenticated with Google',
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      picture: user.picture
    }
  })
})

authRoutes.get('/google/callback', (c) => {
  const token = c.get('token')
  const grantedScopes = c.get('granted-scopes')
  const user = c.get('user-google')

  console.log(token, grantedScopes, user)

  return c.json({
    token,
    grantedScopes,
    user
  })
})

export default authRoutes
