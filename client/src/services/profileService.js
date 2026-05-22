import apiClient from './apiClient'

export const profileService = {
  async getProfile() {
    const { data } = await apiClient.get('/profile')
    return data
  },

  async updateProfile(payload) {
    const { data } = await apiClient.post('/profile', payload)
    return data
  },
}
