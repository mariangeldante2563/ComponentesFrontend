//construimos el dasboard del administrador, no funcional sin el backend

export default function DashboardAdmin() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Panel admin</h1>
        <p className="text-gray-600">Métricas globales y control de asistencia del equipo.</p>
      </div>
    
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="card">
          <p className="text-sm text-gray-500">Asistencias hoy</p>
          <p className="text-2xl font-bold">42</p>
          <p className="text-sm text-gray-500 mt-2">90% puntualidad</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500">Retrasos</p>
          <p className="text-2xl font-bold text-amber-600">6</p>
          <p className="text-sm text-gray-500 mt-2">+2 vs ayer</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500">Ausencias</p>
          <p className="text-2xl font-bold text-red-600">3</p>
          <p className="text-sm text-gray-500 mt-2">-1 vs ayer</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500">Prom. horas</p>
          <p className="text-2xl font-bold">7h 45m</p>
          <p className="text-sm text-gray-500 mt-2">Objetivo: 8h</p>
        </div>
      </div>
      
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Asistencias del equipo</h2>
          <div className="flex gap-2 text-sm">
            <button className="btn-secondary">Exportar CSV</button>
            <button className="btn-primary">Filtrar</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr>
                <th className="table-header">Empleado</th>
                <th className="table-header">Fecha</th>
                <th className="table-header">Entrada</th>
                <th className="table-header">Salida</th>
                <th className="table-header">Estado</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4].map((i) => (
                <tr key={i}>
                  <td className="table-cell">Empleado {i}</td>
                  <td className="table-cell">2026-02-1{i}</td>
                  <td className="table-cell">09:00</td>
                  <td className="table-cell">17:05</td>
                  <td className="table-cell"><span className="badge-blue">Presente</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}