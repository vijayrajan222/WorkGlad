import apiClient from './apiClient'

export const employeeService = {
  async getEmployees(params = {}) {
    const { data } = await apiClient.get('/employees', { params })
    return data
  },

  async createEmployee(payload) {
    const { data } = await apiClient.post('/employees', payload)
    return data
  },

  async updateEmployee(id, payload) {
    const { data } = await apiClient.put(`/employees/${id}`, payload)
    return data
  },

  async deleteEmployee(id) {
    const { data } = await apiClient.delete(`/employees/${id}`)
    return data
  },
}
