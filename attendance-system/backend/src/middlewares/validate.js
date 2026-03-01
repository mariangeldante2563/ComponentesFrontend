// ============================================
// Middleware: ejecutar validaciones
// ============================================
// Recoge los errores de express-validator y
// retorna una respuesta 400 si hay errores.

const { validationResult } = require('express-validator');

/**
 * Middleware que verifica los resultados de
 * las validaciones de express-validator.
 * Si hay errores, responde con un JSON de errores.
 * Si no hay errores, pasa al siguiente middleware.
 * @param {Object} req - Request
 * @param {Object} res - Response
 * @param {Function} next - Siguiente middleware
 */
function validate(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Error de validación en los datos enviados',
            errors: errors.array().map((err) => ({
                field: err.path,
                msg: err.msg,
            })),
        });
    }

    next();
}

module.exports = { validate };
