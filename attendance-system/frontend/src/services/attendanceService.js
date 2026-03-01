// ============================================
// Servicio de Asistencia - Frontend
// ============================================
// Conecta con los endpoints de asistencia del
// backend. Requiere token JWT en cada petición.

import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

/**
 * Crea un cliente Axios con el token JWT
 * del usuario autenticado en el header.
 * @returns {import('axios').AxiosInstance}
 */
function getClient() {
    const token = localStorage.getItem('token')
    return axios.create({
        baseURL: `${API_URL}/api`,
        timeout: 8000,
        headers: { Authorization: `Bearer ${token}` },
    })
}

/**
 * Extrae un mensaje de error legible desde
 * la respuesta del backend o de Axios.
 * @param {Error} error - Error de Axios
 * @returns {string} Mensaje de error legible
 */
function toMessage(error) {
    const apiMessage = error?.response?.data?.message
    return apiMessage || error.message || 'Error inesperado'
}

const attendanceService = {
    /**
     * Marcar entrada del día actual.
     * POST /api/attendance/check-in
     * @returns {Promise<Object>} Registro de asistencia creado
     */
    async checkIn() {
        try {
            const { data } = await getClient().post('/attendance/check-in')
            return data
        } catch (error) {
            throw new Error(toMessage(error))
        }
    },

    /**
     * Marcar salida del día actual.
     * PUT /api/attendance/check-out
     * @returns {Promise<Object>} Registro de asistencia actualizado
     */
    async checkOut() {
        try {
            const { data } = await getClient().put('/attendance/check-out')
            return data
        } catch (error) {
            throw new Error(toMessage(error))
        }
    },

    /**
     * Obtener el registro de asistencia de hoy.
     * GET /api/attendance/today
     * @returns {Promise<Object|null>} Registro de hoy o null
     */
    async getToday() {
        try {
            const { data } = await getClient().get('/attendance/today')
            return data.attendance
        } catch (error) {
            throw new Error(toMessage(error))
        }
    },

    /**
     * Obtener historial de asistencias con paginación.
     * GET /api/attendance/history?limit=10&page=1
     * @param {number} page - Número de página
     * @param {number} limit - Registros por página
     * @returns {Promise<Object>} { records, pagination }
     */
    async getHistory(page = 1, limit = 10) {
        try {
            const { data } = await getClient().get(
                `/attendance/history?page=${page}&limit=${limit}`
            )
            return data
        } catch (error) {
            throw new Error(toMessage(error))
        }
    },

    /**
     * Obtener resumen mensual de asistencias.
     * GET /api/attendance/summary
     * @returns {Promise<Object>} { totalDays, absences, totalHours, avgHours }
     */
    async getSummary() {
        try {
            const { data } = await getClient().get('/attendance/summary')
            return data.summary
        } catch (error) {
            throw new Error(toMessage(error))
        }
    },
}

export default attendanceService
