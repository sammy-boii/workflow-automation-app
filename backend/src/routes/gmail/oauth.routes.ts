import { Hono } from 'hono'
import { googleAuth } from '@hono/oauth-providers/google'
import { SCOPES } from '@/src/constants/scopes'
import { REDIRECT_URL } from '@/src/constants/redirect-url'

export const gmailOAuthRoutes = new Hono()

// handles both /oauth and /oauth/callback

gmailOAuthRoutes.use(
  '/*',
  googleAuth({
    client_id: Bun.env.GOOGLE_CLIENT_ID,
    client_secret: Bun.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: REDIRECT_URL.GMAIL.OAUTH,
    scope: SCOPES.GMAIL,
    access_type: 'offline',
    prompt: 'consent'
  })
)

// runs after successful authentication
gmailOAuthRoutes.get('/callback', (c) => {
  const user = c.get('user-google')

  if (!user) {
    return c.json(
      {
        error: 'No user found'
      },
      401
    )
  }

  console.log(c.get('token'))

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

  return c.json({
    token,
    grantedScopes,
    user
  })
})
