
// enlazar la pagina del login y la creacion de un titulo
//campos de control 
import { Link } from 'react-router-dom'

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-card border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Crear cuenta</h1>
        <p className="text-sm text-gray-600 mb-6">Registra un nuevo usuario (empleado o admin).</p>

        <form className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1 sm:col-span-1">
            <label className="text-sm font-medium text-gray-700">Nombre</label>
            <input type="text" className="input-field" placeholder="Ana Lopez" />
          </div>
          <div className="space-y-1 sm:col-span-1">
            <label className="text-sm font-medium text-gray-700">Correo</label>
            <input type="email" className="input-field" placeholder="ana@empresa.com" />
          </div>
          <div className="space-y-1 sm:col-span-1">
            <label className="text-sm font-medium text-gray-700">Contraseña</label>
            <input type="password" className="input-field" placeholder="********" />
          </div>
          <div className="space-y-1 sm:col-span-1">
            <label className="text-sm font-medium text-gray-700">Rol</label>
            <select className="input-field">
              <option value="employee">Empleado</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className="btn-primary w-full">Crear cuenta</button>
          </div>
        </form>

        <p className="mt-4 text-sm text-gray-600 text-center">
          ¿Ya tienes cuenta? <Link to="/login" className="text-primary-700 hover:underline">Inicia sesion</Link>
        </p>
      </div>
    </div>
  )
}