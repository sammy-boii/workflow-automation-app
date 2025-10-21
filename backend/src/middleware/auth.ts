import { Context, Next } from 'hono'
import jwt from 'jsonwebtoken'

export const authMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header('Authorization')
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : null

  if (!token) {
    return c.json({ error: 'JWT token not provided' }, 401)
  }

  try {
    const decoded = jwt.verify(token, Bun.env.JWT_SECRET as string)
    console.log(decoded)

    c.set('user', decoded)
    next()
  } catch (err) {
    return c.json({ error: 'Invalid token' }, 403)
  }
}
