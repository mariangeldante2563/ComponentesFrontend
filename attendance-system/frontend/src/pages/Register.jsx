import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../contexts/AuthContext'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'employee' })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) {
      toast.error('Completa nombre, correo y contraseña')
      return
    }
    setSubmitting(true)
    try {
      await register(form)
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.message || 'No se pudo registrar')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-card border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Crear una cuenta</h1>
        <p className="text-sm text-gray-600 mb-6">Registra un nuevo usuario (empleado o administrador).</p>

        <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
          <div className="space-y-1 sm:col-span-1">
            <label className="text-sm font-medium text-gray-700">Nombre</label>
            <input
              name="name"
              type="text"
              className="input-field"
              placeholder="Ana Lopez"
              value={form.name}
              onChange={handleChange}
              disabled={submitting}
            />
          </div>
          <div className="space-y-1 sm:col-span-1">
            <label className="text-sm font-medium text-gray-700">Correo</label>
            <input
              name="email"
              type="email"
              className="input-field"
              placeholder="ana@empresa.com"
              value={form.email}
              onChange={handleChange}
              disabled={submitting}
            />
          </div>
          <div className="space-y-1 sm:col-span-1">
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
          <div className="space-y-1 sm:col-span-1">
            <label className="text-sm font-medium text-gray-700">Rol</label>
            <select
              name="role"
              className="input-field"
              value={form.role}
              onChange={handleChange}
              disabled={submitting}
            >
              <option value="employee">Empleado</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className="btn-primary w-full" disabled={submitting}>
              {submitting ? 'Creando...' : 'Crear una cuenta'}
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm text-gray-600 text-center">
          ¿Ya tienes cuenta? <Link to="/login" className="text-primary-700 hover:underline">Inicia sesion</Link>
        </p>
      </div>
    </div>
  )
}