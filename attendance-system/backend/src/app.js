// ============================================
// Configuración de la aplicación Express
// ============================================
// Configura middlewares globales, rutas y el
// manejador centralizado de errores.

require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Importar rutas
const authRoutes = require('./routes/auth.routes');
const attendanceRoutes = require('./routes/attendance.routes');

// Importar middleware de errores
const { errorHandler, notFoundHandler } = require('./middlewares/errorHandler');

// Crear instancia de Express
const app = express();

// ============================================
// Middlewares globales
// ============================================

// Habilitar CORS para el frontend (React en desarrollo)
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:5175',
    ],
    credentials: true,
}));

// Parsear cuerpos JSON con límite de tamaño
app.use(express.json({ limit: '10mb' }));

// Parsear datos de formularios URL-encoded
app.use(express.urlencoded({ extended: true }));

// ============================================
// Ruta de verificación de salud del servidor
// ============================================

app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Servidor del sistema de asistencia activo',
        timestamp: new Date().toISOString(),
    });
});

// ============================================
// Registro de rutas de la API
// ============================================

app.use('/api/auth', authRoutes);
app.use('/api/attendance', attendanceRoutes);

// ============================================
// Manejadores de errores (deben ir al final)
// ============================================

// Ruta no encontrada (404)
app.use(notFoundHandler);

// Manejador centralizado de errores
app.use(errorHandler);

module.exports = app;
