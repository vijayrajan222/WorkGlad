import apiClient from './apiClient'

export const payslipService = {
  async getPayslips(params = {}) {
    const { data } = await apiClient.get('/payslips', { params })
    return data
  },

  async getPayslipById(id) {
    const { data } = await apiClient.get(`/payslips/${id}`)
    return data
  },

  async createPayslip(payload) {
    const { data } = await apiClient.post('/payslips', payload)
    return data
  },
}
