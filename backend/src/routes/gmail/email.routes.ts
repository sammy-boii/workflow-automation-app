import { API_ROUTES } from '@/src/constants'
import { getEmails } from '@/src/controllers/gmail/email.controller'
import { Hono } from 'hono'

export const emailRoutes = new Hono()

<<<<<<< HEAD
emailRoutes.get('/', getEmails)
=======
emailRoutes.get('/test', getEmails)
>>>>>>> 294f5cdda32b42a1af10a700e0598dc1b2d848c4
