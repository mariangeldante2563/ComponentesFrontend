// Dashboard del empleado - Funcional con backend

import { useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'
import attendanceService from '../services/attendanceService'

export default function DashboardEmployee() {
    const [today, setToday] = useState(null)
    const [history, setHistory] = useState([])
    const [summary, setSummary] = useState({ totalDays: 0, absences: 0, avgHours: '0h 0m' })
    const [loading, setLoading] = useState(true)
    const [actionLoading, setActionLoading] = useState(false)

    // Cargar datos al montar el componente
    const loadData = useCallback(async () => {
        try {
            setLoading(true)
            const [todayData, historyData, summaryData] = await Promise.all([
                attendanceService.getToday(),
                attendanceService.getHistory(1, 10),
                attendanceService.getSummary(),
            ])
            setToday(todayData)
            setHistory(historyData.records || [])
            setSummary(summaryData)
        } catch (error) {
            toast.error(error.message || 'Error al cargar datos')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        loadData()
    }, [loadData])

    // Determinar estado actual del empleado
    const hasCheckedIn = today && today.checkIn
    const hasCheckedOut = today && today.checkOut
    const currentStatus = !hasCheckedIn
        ? 'Sin marcar'
        : hasCheckedOut
            ? 'Jornada finalizada'
            : 'En jornada'
    const statusColor = !hasCheckedIn
        ? 'text-gray-500'
        : hasCheckedOut
            ? 'text-blue-700'
            : 'text-green-700'

    // Calcular horas transcurridas hoy
    function getHoursToday() {
        if (!hasCheckedIn) return '0h 0m'
        if (hasCheckedOut && today.hoursWorked) {
            const h = Math.floor(today.hoursWorked)
            const m = Math.round((today.hoursWorked - h) * 60)
            return `${h}h ${m}m`
        }
        const start = new Date(today.checkIn)
        const now = new Date()
        const diffMs = now.getTime() - start.getTime()
        const hours = Math.floor(diffMs / (1000 * 60 * 60))
        const minutes = Math.round((diffMs % (1000 * 60 * 60)) / (1000 * 60))
        return `${hours}h ${minutes}m`
    }

    // Formatear hora desde una fecha ISO
    function formatTime(dateStr) {
        if (!dateStr) return '--:--'
        const d = new Date(dateStr)
        return d.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: false })
    }

    // Formatear fecha desde una fecha ISO
    function formatDate(dateStr) {
        if (!dateStr) return '--'
        const d = new Date(dateStr)
        return d.toISOString().split('T')[0]
    }

    // Formatear horas trabajadas de un registro
    function formatHoursWorked(record) {
        if (!record.hoursWorked || record.hoursWorked === 0) return '--'
        const h = Math.floor(record.hoursWorked)
        const m = Math.round((record.hoursWorked - h) * 60)
        return `${h}h ${m}m`
    }

    // Traducir estado del registro
    function translateStatus(status) {
        const map = { present: 'Presente', late: 'Tardanza', absent: 'Ausente' }
        return map[status] || status
    }

    // Color del badge según estado
    function statusBadge(status) {
        const map = {
            present: 'badge-green',
            late: 'badge-yellow',
            absent: 'badge-red',
        }
        return map[status] || 'badge-blue'
    }

    // Marcar entrada
    async function handleCheckIn() {
        try {
            setActionLoading(true)
            await attendanceService.checkIn()
            toast.success('Entrada registrada correctamente')
            await loadData()
        } catch (error) {
            toast.error(error.message)
        } finally {
            setActionLoading(false)
        }
    }

    // Marcar salida
    async function handleCheckOut() {
        try {
            setActionLoading(true)
            await attendanceService.checkOut()
            toast.success('Salida registrada correctamente')
            await loadData()
        } catch (error) {
            toast.error(error.message)
        } finally {
            setActionLoading(false)
        }
    }

    // Pantalla de carga
    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <p className="text-gray-500">Cargando datos...</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Panel empleado</h1>
                <p className="text-gray-600">Marca tu asistencia y revisa tu historial.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
                <div className="card">
                    <p className="text-sm text-gray-500">Estado actual</p>
                    <p className={`text-lg font-semibold ${statusColor}`}>{currentStatus}</p>
                    <p className="text-sm text-gray-500 mt-2">
                        {hasCheckedIn
                            ? `Ultima marca: ${formatTime(today.checkIn)}`
                            : 'Sin entrada registrada'}
                    </p>
                </div>
                <div className="card">
                    <p className="text-sm text-gray-500">Horas hoy</p>
                    <p className="text-2xl font-bold">{getHoursToday()}</p>
                    <p className="text-sm text-gray-500 mt-2">Meta: 8h</p>
                </div>
                <div className="card">
                    <p className="text-sm text-gray-500">Asistencias del mes</p>
                    <p className="text-2xl font-bold">{summary.totalDays}</p>
                    <p className="text-sm text-gray-500 mt-2">Faltas: {summary.absences}</p>
                </div>
            </div>

            <div className="card flex flex-wrap items-center gap-3">
                <button
                    className="btn-primary"
                    onClick={handleCheckIn}
                    disabled={actionLoading || hasCheckedIn}
                >
                    {actionLoading ? 'Registrando...' : 'Marcar entrada'}
                </button>
                <button
                    className="btn-secondary"
                    onClick={handleCheckOut}
                    disabled={actionLoading || !hasCheckedIn || hasCheckedOut}
                >
                    {actionLoading ? 'Registrando...' : 'Marcar salida'}
                </button>
                <p className="text-sm text-gray-600">
                    Recuerda marcar al inicio y al final de tu jornada.
                </p>
            </div>

            <div className="card">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Historial reciente</h2>
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
                            {history.length === 0 ? (
                                <tr>
                                    <td className="table-cell" colSpan="5">
                                        <p className="text-center text-gray-400">
                                            Sin registros aún
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                history.map((record) => (
                                    <tr key={record._id}>
                                        <td className="table-cell">{formatDate(record.date)}</td>
                                        <td className="table-cell">
                                            {formatTime(record.checkIn)}
                                        </td>
                                        <td className="table-cell">
                                            {formatTime(record.checkOut)}
                                        </td>
                                        <td className="table-cell">
                                            {formatHoursWorked(record)}
                                        </td>
                                        <td className="table-cell">
                                            <span className={statusBadge(record.status)}>
                                                {translateStatus(record.status)}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}