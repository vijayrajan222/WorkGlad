import apiClient from './apiClient'

export const attendanceService = {
  async getAttendance(params = {}) {
    const { data } = await apiClient.get('/attendance', { params })
    return data
  },

  async clockInOut() {
    const { data } = await apiClient.post('/attendance')
    return data
  },
}
