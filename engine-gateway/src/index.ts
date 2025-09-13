import { Hono } from 'hono'

const app = new Hono()

const PORT = process.env.PORT

app.get('/', (c) => c.text('Hello from Bun + Hono!'))

Bun.serve({
  fetch: app.fetch,
  port: PORT
})

console.log(`Server running at PORT ${PORT}`)
