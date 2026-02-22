
// creamos el login
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      toast.error('Completa correo y contraseña')
      return
    }
    setSubmitting(true)
    try {
      await login(form)
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.message || 'No se pudo iniciar sesion')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-width-sm max-w-md rounded-2xl bg-white p-8 shadow-card border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Iniciar sesion</h1>
        <p className="text-sm text-gray-600 mb-6">Accede al panel de asistencia.</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Correo</label>
            <input
              name="email"
              type="email"
              className="input-field"
              placeholder="tu@empresa.com"
              value={form.email}
              onChange={handleChange}
              disabled={submitting}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Contraseña</label>
            <input
              name="password"
              type="password"
              className="input-field"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              disabled={submitting}
            />
          </div>
          <button type="submit" className="btn-primary w-full" disabled={submitting}>
            {submitting ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="mt-4 text-sm text-gray-600 flex justify-between">
          <Link to="/recover" className="text-primary-700 hover:underline">¿Olvidaste tu contraseña?</Link>
          <Link to="/register" className="text-primary-700 hover:underline">Crear cuenta</Link>
        </div>
      </div>
    </div>
  )
}