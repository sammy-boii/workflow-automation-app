import { API_ROUTES } from '@/src/constants'
import { Context } from 'hono'

export const getEmails = async (c: Context) => {
  const res = await fetch(
    API_ROUTES.GMAIL.GET_MESSAGES('102739137290115770903'),
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
}
