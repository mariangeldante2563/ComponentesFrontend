// ============================================
// Rutas de Asistencia
// ============================================
// Define las rutas para marcar entrada, salida,
// consultar estado del día e historial.

const { Router } = require('express');
const { authMiddleware } = require('../middlewares/auth');
const {
    checkIn,
    checkOut,
    getToday,
    getHistory,
    getMonthlySummary,
} = require('../controllers/attendance.controller');

const router = Router();

// Todas las rutas requieren autenticación JWT
router.use(authMiddleware);

// ============================================
// POST /api/attendance/check-in
// Registra la entrada del empleado
// ============================================

router.post('/check-in', checkIn);

// ============================================
// PUT /api/attendance/check-out
// Registra la salida del empleado
// ============================================

router.put('/check-out', checkOut);

// ============================================
// GET /api/attendance/today
// Retorna el registro de asistencia de hoy
// ============================================

router.get('/today', getToday);

// ============================================
// GET /api/attendance/history
// Retorna el historial de asistencias
// ============================================

router.get('/history', getHistory);

// ============================================
// GET /api/attendance/summary
// Retorna resumen mensual de asistencias
// ============================================

router.get('/summary', getMonthlySummary);

module.exports = router;
