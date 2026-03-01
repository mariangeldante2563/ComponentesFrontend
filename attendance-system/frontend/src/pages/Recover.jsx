import { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../contexts/AuthContext'

export default function Recover() {
  const { forgotPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) {
      toast.error('Ingresa tu correo')
      return
    }
    setSubmitting(true)
    try {
      await forgotPassword(email)
      toast.success('Enviamos un enlace (simulado)')
    } catch (error) {
      toast.error(error.message || 'No se pudo enviar el enlace')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-card border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Recuperar contraseña</h1>
        <p className="text-sm text-gray-600 mb-6">Ingresa tu correo para enviarte instrucciones.</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Correo</label>
            <input
              type="email"
              className="input-field"
              placeholder="tu@empresa.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={submitting}
            />
          </div>
          <button type="submit" className="btn-primary w-full" disabled={submitting}>
            {submitting ? 'Enviando...' : 'Enviar enlace'}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600 text-center">
          ¿Volver al login? <Link to="/login" className="text-primary-700 hover:underline">Iniciar sesion</Link>
        </p>
      </div>
    </div>
  )
}