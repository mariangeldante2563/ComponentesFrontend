// agregamos las importaciones para los enlaces 


import { NavLink, Outlet } from 'react-router-dom'
import { LogOut, LayoutDashboard, Shield, Home as HomeIcon } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

//definimos las clases para tailwind

const navLinkClass = ({ isActive }) =>
  `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors
   ${isActive ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'}`

export default function AppShell() {
  const { user, logout, isAdmin } = useAuth()

  //construimos el layout
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="grid grid-cols-[240px_1fr] min-h-screen">
        <aside className="border-r border-gray-200 bg-white p-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-gray-500">SESION</p>
              <p className="font-semibold text-gray-800">{user?.name || 'Usuario'}</p>
            </div>
            <span className="text-xs rounded-full bg-primary-100 text-primary-700 px-2 py-1 capitalize">
              {user?.role || 'role'}
            </span>
          </div>

          <nav className="space-y-1">
            <NavLink to="/" className={navLinkClass}>
              <HomeIcon size={16} /> INICIO
            </NavLink>
            <NavLink to="/dashboard" className={navLinkClass}>
              <LayoutDashboard size={16} /> PANEL EMPLEADO
            </NavLink>
            {isAdmin && (
              <NavLink to="/admin" className={navLinkClass}>
                <Shield size={16} /> PANEL ADMINISTRADO
              </NavLink>
            )}
          </nav>

          <button
            onClick={logout}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            <LogOut size={16} /> CERRAR SESION
          </button>
        </aside>

        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}