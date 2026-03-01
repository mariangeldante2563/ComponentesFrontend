import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import authService from '../services/authService'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken]     = useState(() => localStorage.getItem('token'))

  useEffect(() => {
    const init = async () => {
      const savedToken = localStorage.getItem('token')
      const savedUser  = localStorage.getItem('user')
      if (savedToken && savedUser) {
        try {
          setToken(savedToken)
          setUser(JSON.parse(savedUser))
        } catch {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
        }
      }
      setLoading(false)
    }
    init()
  }, [])

  const login = useCallback(async (credentials) => {
    setLoading(true)
    try {
      const data = await authService.login(credentials)
      setToken(data.token)
      setUser(data.user)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      toast.success(`Bienvenido, ${data.user.name}!`)
      return data.user
    } finally {
      setLoading(false)
    }
  }, [])

  const register = useCallback(async (userData) => {
    setLoading(true)
    try {
      const data = await authService.register(userData)
      setToken(data.token)
      setUser(data.user)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      toast.success('Cuenta creada exitosamente!')
      return data.user
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    toast.success('Sesion cerrada')
  }, [])

  const forgotPassword = useCallback(async (email) => {
    await authService.forgotPassword(email)
    toast.success('Email de recuperacion enviado')
  }, [])

  const isAdmin    = user?.role === 'admin'
  const isEmployee = user?.role === 'employee'

  const value = {
    user, token, loading, isAdmin, isEmployee,
    login, register, logout, forgotPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
