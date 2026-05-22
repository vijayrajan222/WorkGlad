import apiClient from './apiClient'

export const leaveService = {
  async getLeaves(params = {}) {
    const { data } = await apiClient.get('/leave', { params })
    return data
  },

  async createLeave(payload) {
    const { data } = await apiClient.post('/leave', payload)
    return data
  },

  async updateLeaveStatus(id, status) {
    const { data } = await apiClient.patch(`/leave/${id}`, { status })
    return data
  },
}
