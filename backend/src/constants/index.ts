export const PORT = Bun.env.PORT || 5000

export const BACKEND_BASE_URL =
  Bun.env.NODE_ENV === 'production'
    ? `http://localhost:${PORT}`
    : `http://localhost:${PORT}`

export const GMAIL_API_BASE_URL = 'https://gmail.googleapis.com/gmail/v1'

const API_ROUTES = {
  GMAIL: {
    GET_MESSAGES: (id: string) => GMAIL_API_BASE_URL + `/users/${id}/messages`
  }
}

export { API_ROUTES }
