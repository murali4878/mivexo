import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  timeout: 10000
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('wayvero-token')
      localStorage.removeItem('wayvero-user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
