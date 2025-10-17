const PORT = process.env.PORT || 5000

export const BACKEND_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? `http://localhost:${PORT}`
    : `http://localhost:${PORT}`
