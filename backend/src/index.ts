import { Hono } from 'hono'

import { routes } from './routes'
import { PORT } from './constants'

export const app = new Hono()

app.route('/api', routes)

Bun.serve({
  fetch: app.fetch,
  port: PORT
})

console.log(`Server running at PORT ${PORT}`)
