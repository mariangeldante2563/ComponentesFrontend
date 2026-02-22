
// creamos el login
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-width-sm max-w-md rounded-2xl bg-white p-8 shadow-card border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Iniciar sesion</h1>
        <p className="text-sm text-gray-600 mb-6">Accede al panel de asistencia.</p>

        <form className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Correo</label>
            <input type="email" className="input-field" placeholder="tu@empresa.com" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Contraseña</label>
            <input type="password" className="input-field" placeholder="********" />
          </div>
          <button type="submit" className="btn-primary w-full">Entrar</button>
        </form>

        <div className="mt-4 text-sm text-gray-600 flex justify-between">
          <Link to="/recover" className="text-primary-700 hover:underline">¿Olvidaste tu contraseña?</Link>
          <Link to="/register" className="text-primary-700 hover:underline">Crear cuenta</Link>
        </div>
      </div>
    </div>
  )
}