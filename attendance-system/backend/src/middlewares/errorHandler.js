// ============================================
// Middleware: manejo centralizado de errores
// ============================================
// Captura todos los errores no manejados y
// responde con un mensaje preciso al cliente.

/**
 * Maneja rutas no encontradas (404).
 * Se registra antes del errorHandler para
 * capturar peticiones a rutas inexistentes.
 * @param {Object} req - Request
 * @param {Object} res - Response
 * @param {Function} next - Siguiente middleware
 */
function notFoundHandler(req, res, next) {
    const error = new Error(`Ruta no encontrada: ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
}

/**
 * Manejador centralizado de errores.
 * Captura cualquier error lanzado y responde
 * con un JSON estructurado al cliente.
 * @param {Error} err - Error capturado
 * @param {Object} req - Request
 * @param {Object} res - Response
 * @param {Function} next - Siguiente middleware
 */
function errorHandler(err, req, res, next) {
    // Código de estado: usar el del error o 500
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Error interno del servidor';

    // Error de validación de Mongoose
    if (err.name === 'ValidationError') {
        statusCode = 400;
        const messages = Object.values(err.errors).map((e) => e.message);
        message = messages.join('. ');
    }

    // Error de duplicado en MongoDB (código 11000)
    if (err.code === 11000) {
        statusCode = 400;
        const field = Object.keys(err.keyValue).join(', ');
        message = `El valor del campo '${field}' ya existe`;
    }

    // Error de cast de Mongoose (ID inválido)
    if (err.name === 'CastError') {
        statusCode = 400;
        message = `Valor inválido para el campo '${err.path}'`;
    }

    // Error de token JWT inválido
    if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Token de autenticación inválido';
    }

    // Error de token JWT expirado
    if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token de autenticación expirado';
    }

    // Log del error en consola para debugging
    console.error(`[ERROR] ${statusCode} - ${message}`);
    if (process.env.NODE_ENV !== 'production') {
        console.error('[ERROR] Stack:', err.stack);
    }

    // Respuesta JSON al cliente
    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
    });
}

module.exports = { errorHandler, notFoundHandler };
