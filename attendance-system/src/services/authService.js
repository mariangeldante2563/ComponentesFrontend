import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

const client = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 8000,
})

function mapUserResponse(data) {
  return {
    token: data.token,
    user: data.user,
  }
}

function toMessage(error) {
  const apiMessage = error?.response?.data?.message
  const validation = error?.response?.data?.errors?.[0]?.msg
  return apiMessage || validation || error.message || 'Error inesperado'
}

const authService = {
  async login({ email, password }) {
    if (!email || !password) {
      throw new Error('Credenciales requeridas')
    }
    try {
      const { data } = await client.post('/auth/login', { email, password })
      return mapUserResponse(data)
    } catch (error) {
      throw new Error(toMessage(error))
    }
  },

  async register(payload) {
    const { email, name, password, role = 'employee' } = payload || {}
    if (!email || !name || !password) {
      throw new Error('Datos incompletos')
    }
    try {
      const { data } = await client.post('/auth/register', { email, name, password, role })
      return mapUserResponse(data)
    } catch (error) {
      throw new Error(toMessage(error))
    }
  },

  async forgotPassword(email) {
    if (!email) throw new Error('Email requerido')
    try {
      const { data } = await client.post('/auth/forgot', { email })
      return data
    } catch (error) {
      throw new Error(toMessage(error))
    }
  },
}

export default authService