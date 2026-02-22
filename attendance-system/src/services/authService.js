// Mock auth service to unblock UI; replace with real API calls using axios/fetch.

const fakeToken = 'mock-token-123'

const authService = {
  async login({ email, password }) {
    if (!email || !password) {
      throw new Error('Credenciales requeridas')
    }
    const role = email.includes('admin') ? 'admin' : 'employee'
    return {
      token: fakeToken,
      user: {
        id: 1,
        name: 'Usuario Demo',
        email,
        role,
      },
    }
  },

  async register(payload) {
    const { email, name, password, role = 'employee' } = payload || {}
    if (!email || !name || !password) {
      throw new Error('Datos incompletos')
    }
    return {
      token: fakeToken,
      user: {
        id: Date.now(),
        name,
        email,
        role,
      },
    }
  },

  async forgotPassword(email) {
    if (!email) throw new Error('Email requerido')
    return { ok: true }
  },
}

export default authService