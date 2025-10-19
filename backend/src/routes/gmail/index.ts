import { Hono } from 'hono'
import { gmailOAuthRoutes } from './oauth.routes'
import { emailRoutes } from './email.routes'

export const gmailRoutes = new Hono()

gmailRoutes.route('/oauth', gmailOAuthRoutes)
gmailRoutes.route('/email', emailRoutes)
