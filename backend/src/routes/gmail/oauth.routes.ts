import { Hono } from 'hono'
import { BACKEND_BASE_URL } from '../../lib/constants'
import { googleAuth } from '@hono/oauth-providers/google'

export const gmailOAuthRoutes = new Hono()

// handles both /oauth and /oauth/callback

gmailOAuthRoutes.use(
  '/*',
  googleAuth({
    client_id: Bun.env.GOOGLE_CLIENT_ID,
    client_secret: Bun.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: `${BACKEND_BASE_URL}/api/auth/google/callback`,
    scope: [
      'openid',
      'email',
      'profile',
      'https://www.googleapis.com/auth/gmail.modify',
      'https://www.googleapis.com/auth/gmail.insert'
    ],
    access_type: 'offline',
    prompt: 'consent'
  })
)

gmailOAuthRoutes.get('/test', async (c) => {
  const res = await fetch(
    'https://gmail.googleapis.com/gmail/v1/users/102739137290115770903/messages',
    {
      headers: {
        Authorization: `Bearer`
      }
    }
  )
  const data = await res.json()
  console.log(data)
  return c.json({
    message: 'Success',
    data
  })
})

// runs after successful authentication
gmailOAuthRoutes.get('/callback', (c) => {
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

gmailOAuthRoutes.get('/callback', (c) => {
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
