import { createContext, useContext, useState, useEffect } from 'react'
import api from '../lib/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('wayvero-token')
    const userData = localStorage.getItem('wayvero-user')
    if (token && userData) {
      try {
        setUser(JSON.parse(userData))
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      } catch (e) {
        localStorage.removeItem('wayvero-token')
        localStorage.removeItem('wayvero-user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const res = await api.post('/api/auth/login', { email, password })
    const { token, data } = res.data
    localStorage.setItem('wayvero-token', token)
    localStorage.setItem('wayvero-user', JSON.stringify(data))
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setUser(data)
    return data
  }

  const register = async (formData) => {
    const res = await api.post('/api/auth/register', formData)
    const { token, data } = res.data
    localStorage.setItem('wayvero-token', token)
    localStorage.setItem('wayvero-user', JSON.stringify(data))
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setUser(data)
    return data
  }

  const logout = () => {
    localStorage.removeItem('wayvero-token')
    localStorage.removeItem('wayvero-user')
    delete api.defaults.headers.common['Authorization']
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, isAuthenticated: !!user, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
