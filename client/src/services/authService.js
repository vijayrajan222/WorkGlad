import apiClient, { AUTH_TOKEN_KEY, AUTH_USER_KEY } from './apiClient'

export const authService = {
  async login({ email, password, role }) {
    const { data } = await apiClient.post('/auth/login', {
      email,
      password,
      role_type: role?.toLowerCase(),
    })

    if (data.token) {
      localStorage.setItem(AUTH_TOKEN_KEY, data.token)
    }

    if (data.user) {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(data.user))
    }

    return data
  },

  async getSession() {
    const { data } = await apiClient.get('/auth/session')
    return data
  },

  async changePassword(payload) {
    const { data } = await apiClient.post('/auth/change-password', payload)
    return data
  },

  logout() {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    localStorage.removeItem(AUTH_USER_KEY)
    localStorage.removeItem('token')
  },

  getStoredToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY) || localStorage.getItem('token')
  },

  getStoredUser() {
    const storedUser = localStorage.getItem(AUTH_USER_KEY)

    if (!storedUser) return null

    try {
      return JSON.parse(storedUser)
    } catch {
      localStorage.removeItem(AUTH_USER_KEY)
      return null
    }
  },
}
