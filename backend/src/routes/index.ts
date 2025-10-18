import { Hono } from 'hono'
import authRoutes from './auth.routes'

export const routes = new Hono()

routes.route('/auth', authRoutes)
