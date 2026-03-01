
//estado de la jornada  

export default function DashboardEmployee() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Panel empleado</h1>
        <p className="text-gray-600">Marca tu asistencia y revisa tu historial.</p>
      </div>
  // estado actual de la jornada

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="card">
          <p className="text-sm text-gray-500">Estado actual</p>
          <p className="text-lg font-semibold text-green-700">En jornada</p>
          <p className="text-sm text-gray-500 mt-2">Ultima marca: 08:55</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500">Horas hoy</p>
          <p className="text-2xl font-bold">4h 20m</p>
          <p className="text-sm text-gray-500 mt-2">Meta: 8h</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500">Asistencias del mes</p>
          <p className="text-2xl font-bold">18</p>
          <p className="text-sm text-gray-500 mt-2">Faltas: 1</p>
        </div>
      </div>

      <div className="card flex flex-wrap items-center gap-3">
        <button className="btn-primary">Marcar entrada</button>
        <button className="btn-secondary">Marcar salida</button>
        <p className="text-sm text-gray-600">Recuerda marcar al inicio y al final de tu jornada.</p>
      </div>
      // tabla de historial
      
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Historial reciente</h2>
          <button className="text-sm text-primary-700 hover:underline">Ver todo</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr>
                <th className="table-header">Fecha</th>
                <th className="table-header">Entrada</th>
                <th className="table-header">Salida</th>
                <th className="table-header">Horas</th>
                <th className="table-header">Estado</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((i) => (
                <tr key={i}>
                  <td className="table-cell">2026-02-0{i}</td>
                  <td className="table-cell">08:55</td>
                  <td className="table-cell">17:10</td>
                  <td className="table-cell">8h 15m</td>
                  <td className="table-cell"><span className="badge-green">Completado</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}