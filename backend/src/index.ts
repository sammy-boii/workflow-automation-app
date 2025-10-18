import { Hono } from 'hono'

import { routes } from './routes'

import { TUserHaha } from '@myproject/shared'

const PORT = Bun.env.PORT // process works too

export const app = new Hono()

app.route('/api', routes)

Bun.serve({
  fetch: app.fetch,
  port: PORT
})

console.log(`Server running at PORT ${PORT}`)
