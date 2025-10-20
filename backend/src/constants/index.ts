export const PORT = Bun.env.PORT || 5000

export const BACKEND_BASE_URL =
  Bun.env.NODE_ENV === 'production'
    ? `http://localhost:${PORT}`
    : `http://localhost:${PORT}`

export const GMAIL_API_BASE_URL = 'https://gmail.googleapis.com/gmail/v1'

const API_ROUTES = {
  GMAIL: {
    GET_MESSAGES: (id: string) =>
      GMAIL_API_BASE_URL +
      `/users/${id}/messages/199fd73028db6984/attachments/ANGjdJ_AA9dX7_pj5HjZjLk_9M3FYtb3749E--dT1VXHcEESTbmd9pkTTMtXsIYinwSrH3bnL7_CUvL9FdQ5CRzZN5Qo166ozv_vKNvh7e0u9EXTDVFcLLi1X_eOT5i6pPpvIysefPkYlGwZdM8yeOH0WtfufYANadgaHnlWoeWxVhGOGEfi53dcjPUyWETFZO5A3XLNhSsZSgc6gJSmsdEkLt69thO25Pqnh2tZxCF1NsBmECcrDfevNF31zOBfEfUC8zLFTjISCnRvO5nvxoaE2bLirq8yI1NeT-t93KYBJwoMKsw7z5Wgcv67MBI`
  }
}

export { API_ROUTES }
