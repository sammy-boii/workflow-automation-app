import { API_ROUTES } from '@/src/constants'
import { getEmails } from '@/src/controllers/gmail/email.controller'
import { Hono } from 'hono'

export const emailRoutes = new Hono()

emailRoutes.get('/', getEmails)
