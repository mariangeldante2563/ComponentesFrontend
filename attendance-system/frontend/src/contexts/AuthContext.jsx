import { useState, useEffect, useCallback } from 'react'
import AuthContext from './AuthContextDef'
import authService from '../services/authService'
import toast from 'react-hot-toast'

// Proveedor de autenticación (único export de componente)
export default function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken]     = useState(null)

  // Restaurar sesión desde localStorage al montar
  useEffect(() => {
    try {
      const savedToken = localStorage.getItem('token')
      const savedUser  = localStorage.getItem('user')
      if (savedToken && savedUser) {
        setToken(savedToken)
        setUser(JSON.parse(savedUser))
      }
    } catch {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    } finally {
      setLoading(false)
    }
  }, [])

  // Función auxiliar para guardar sesión
  const saveSession = useCallback((data) => {
    setToken(data.token)
    setUser(data.user)
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
  }, [])

  const login = useCallback(async (credentials) => {
    const data = await authService.login(credentials)
    saveSession(data)
    toast.success(`Bienvenido, ${data.user.name}!`)
    return data.user
  }, [saveSession])

  const register = useCallback(async (userData) => {
    const data = await authService.register(userData)
    saveSession(data)
    toast.success('Cuenta creada exitosamente!')
    return data.user
  }, [saveSession])

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
