//creamos las importaciopnes

import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 text-gray-900">
      <header className="mx-auto max-w-5xl px-6 py-12 flex items-center justify-between">
        <div className="text-lg font-semibold">Asistencias Pro</div>
        <nav className="flex items-center gap-4 text-sm font-medium">
          <Link to="/login" className="text-gray-700 hover:text-primary-700">Iniciar sesion</Link>
          <Link to="/register" className="rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700">Registrarse</Link>
        </nav>
      </header>
      
     // main y sus clases 

      <main className="mx-auto max-w-5xl px-6 pb-16">
        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-3 py-1 text-sm font-semibold text-primary-700">
              Control de asistencia y jornada
            </p>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              Gestiona entradas, salidas y dashboards en tiempo real.
            </h1>
            <p className="text-lg text-gray-600">
              Centraliza la asistencia, genera métricas de puntualidad y ofrece paneles diferenciados para empleados y administradores.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/login" className="rounded-lg bg-primary-600 px-5 py-3 text-white font-semibold hover:bg-primary-700">Ir al login</Link>
              <Link to="/dashboard" className="rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-800 hover:bg-gray-100">Ver dashboard demo</Link>
            </div>
            <ul className="grid gap-3 text-sm text-gray-700 sm:grid-cols-2">
              <li className="rounded-lg bg-white p-4 shadow-card border border-gray-100">Marcar entrada y salida con un clic.</li>
              <li className="rounded-lg bg-white p-4 shadow-card border border-gray-100">Histórico filtrable y exportable.</li>
              <li className="rounded-lg bg-white p-4 shadow-card border border-gray-100">Panel admin con métricas agregadas.</li>
              <li className="rounded-lg bg-white p-4 shadow-card border border-gray-100">Autenticación con roles (admin/empleado).</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-card border border-gray-100 space-y-4">
            <h2 className="text-xl font-semibold">Flujo rapido</h2>
            <ol className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-3"><span className="mt-1 h-6 w-6 flex items-center justify-center rounded-full bg-primary-100 text-primary-700 font-semibold">1</span> Crea tu cuenta o inicia sesion.</li>
              <li className="flex items-start gap-3"><span className="mt-1 h-6 w-6 flex items-center justify-center rounded-full bg-primary-100 text-primary-700 font-semibold">2</span> Marca entrada y salida desde el panel empleado.</li>
              <li className="flex items-start gap-3"><span className="mt-1 h-6 w-6 flex items-center justify-center rounded-full bg-primary-100 text-primary-700 font-semibold">3</span> Visualiza métricas y reportes en el panel admin.</li>
            </ol>
          </div>
        </section>
      </main>
    </div>
  )
}