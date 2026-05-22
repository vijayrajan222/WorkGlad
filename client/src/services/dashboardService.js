import apiClient from './apiClient'

export const dashboardService = {
  async getDashboard() {
    const { data } = await apiClient.get('/dashboard')
    return data
  },
}
