import axios from 'axios'

export const AUTH_TOKEN_KEY = 'authToken'
export const AUTH_USER_KEY = 'authUser'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api',
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY) || localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.error || error.message || 'Request failed'

    return Promise.reject({
      ...error,
      message,
    })
  }
)

export default apiClient
