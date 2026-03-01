// ============================================
// Controlador de Asistencia
// ============================================
// Maneja la lógica de marcar entrada, salida,
// consultar historial y estado del día actual.

const Attendance = require('../models/Attendance');

// ============================================
// Función auxiliar: obtener fecha de hoy (sin hora)
// ============================================

function getTodayDate() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

// ============================================
// Función auxiliar: formatear horas trabajadas
// ============================================

function formatHours(decimalHours) {
    const hours = Math.floor(decimalHours);
    const minutes = Math.round((decimalHours - hours) * 60);
    return `${hours}h ${minutes}m`;
}

// ============================================
// POST /api/attendance/check-in - Marcar entrada
// ============================================

/**
 * Registra la entrada del empleado para el día actual.
 * Si ya existe un registro para hoy, retorna error.
 * @param {Object} req - Request con usuario autenticado
 * @param {Object} res - Response
 * @param {Function} next - Siguiente middleware
 */
async function checkIn(req, res, next) {
    try {
        const userId = req.user._id;
        const today = getTodayDate();

        // Verificar si ya marcó entrada hoy
        const existing = await Attendance.findOne({ user: userId, date: today });
        if (existing && existing.checkIn) {
            return res.status(400).json({
                success: false,
                message: 'Ya marcaste tu entrada hoy',
            });
        }

        // Crear registro de asistencia con la hora de entrada
        const now = new Date();
        const attendance = await Attendance.create({
            user: userId,
            date: today,
            checkIn: now,
            status: now.getHours() >= 9 ? 'late' : 'present',
        });

        res.status(201).json({
            success: true,
            message: 'Entrada registrada correctamente',
            attendance,
        });
    } catch (error) {
        next(error);
    }
}

// ============================================
// PUT /api/attendance/check-out - Marcar salida
// ============================================

/**
 * Registra la salida del empleado para el día actual.
 * Calcula las horas trabajadas automáticamente.
 * @param {Object} req - Request con usuario autenticado
 * @param {Object} res - Response
 * @param {Function} next - Siguiente middleware
 */
async function checkOut(req, res, next) {
    try {
        const userId = req.user._id;
        const today = getTodayDate();

        // Buscar el registro de hoy
        const attendance = await Attendance.findOne({ user: userId, date: today });
        if (!attendance || !attendance.checkIn) {
            return res.status(400).json({
                success: false,
                message: 'Primero debes marcar tu entrada',
            });
        }

        if (attendance.checkOut) {
            return res.status(400).json({
                success: false,
                message: 'Ya marcaste tu salida hoy',
            });
        }

        // Registrar hora de salida y calcular horas
        attendance.checkOut = new Date();
        attendance.calculateHours();
        await attendance.save();

        res.status(200).json({
            success: true,
            message: 'Salida registrada correctamente',
            attendance,
        });
    } catch (error) {
        next(error);
    }
}

// ============================================
// GET /api/attendance/today - Estado de hoy
// ============================================

/**
 * Retorna el registro de asistencia del día actual
 * del usuario autenticado, o null si no ha marcado.
 * @param {Object} req - Request con usuario autenticado
 * @param {Object} res - Response
 * @param {Function} next - Siguiente middleware
 */
async function getToday(req, res, next) {
    try {
        const userId = req.user._id;
        const today = getTodayDate();

        const attendance = await Attendance.findOne({ user: userId, date: today });

        res.status(200).json({
            success: true,
            attendance: attendance || null,
        });
    } catch (error) {
        next(error);
    }
}

// ============================================
// GET /api/attendance/history - Historial
// ============================================

/**
 * Retorna el historial de asistencias del usuario
 * autenticado, ordenado por fecha descendente.
 * Soporta paginación con query params.
 * @param {Object} req - Request con ?limit=10&page=1
 * @param {Object} res - Response
 * @param {Function} next - Siguiente middleware
 */
async function getHistory(req, res, next) {
    try {
        const userId = req.user._id;
        const limit = Math.min(parseInt(req.query.limit) || 10, 50);
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * limit;

        const [records, total] = await Promise.all([
            Attendance.find({ user: userId })
                .sort({ date: -1 })
                .skip(skip)
                .limit(limit),
            Attendance.countDocuments({ user: userId }),
        ]);

        res.status(200).json({
            success: true,
            records,
            pagination: { total, page, limit, pages: Math.ceil(total / limit) },
        });
    } catch (error) {
        next(error);
    }
}

// ============================================
// GET /api/attendance/summary - Resumen del mes
// ============================================

/**
 * Retorna las métricas del mes actual: total de
 * asistencias, faltas y promedio de horas.
 * @param {Object} req - Request con usuario autenticado
 * @param {Object} res - Response
 * @param {Function} next - Siguiente middleware
 */
async function getMonthlySummary(req, res, next) {
    try {
        const userId = req.user._id;
        const now = new Date();
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        const records = await Attendance.find({
            user: userId,
            date: { $gte: firstDay, $lte: lastDay },
        });

        const totalDays = records.length;
        const absences = records.filter((r) => r.status === 'absent').length;
        const totalHours = records.reduce((sum, r) => sum + r.hoursWorked, 0);
        const avgHours = totalDays > 0 ? totalHours / totalDays : 0;

        res.status(200).json({
            success: true,
            summary: {
                totalDays,
                absences,
                totalHours: Math.round(totalHours * 100) / 100,
                avgHours: formatHours(avgHours),
            },
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { checkIn, checkOut, getToday, getHistory, getMonthlySummary };
