// ============================================
// Middleware: autenticación JWT
// ============================================
// Verifica que las peticiones protegidas
// incluyan un token JWT válido en el header.

const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Middleware que verifica el token JWT enviado
 * en el header Authorization (formato Bearer).
 * Si es válido, agrega req.user con los datos
 * del usuario autenticado.
 * @param {Object} req - Request
 * @param {Object} res - Response
 * @param {Function} next - Siguiente middleware
 */
async function authMiddleware(req, res, next) {
    try {
        // Extraer el token del header Authorization
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Acceso denegado - Token no proporcionado',
            });
        }

        // Obtener solo el token (sin "Bearer ")
        const token = authHeader.split(' ')[1];

        // Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Buscar el usuario en la base de datos
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Acceso denegado - Usuario no encontrado',
            });
        }

        // Agregar usuario al request para uso posterior
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}

/**
 * Middleware que restringe el acceso según el
 * rol del usuario autenticado.
 * @param  {...string} roles - Roles permitidos (ej: 'admin')
 * @returns {Function} Middleware de autorización
 */
function authorizeRoles(...roles) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Acceso denegado - No autenticado',
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Acceso denegado - No tienes permisos para esta acción',
            });
        }

        next();
    };
}

module.exports = { authMiddleware, authorizeRoles };
