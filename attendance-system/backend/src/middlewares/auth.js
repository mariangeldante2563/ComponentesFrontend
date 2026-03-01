
// Middleware: autenticación JWT
// Verifica que las peticiones protegidas incluyan un token JWT válido en el header.

const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
async function authMiddleware(req, res, next) {
    try {
      
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Acceso denegado - Token no proporcionado',
            });
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Acceso denegado - Usuario no encontrado',
            });
        }

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}

/**
 * @param  {...string} roles 
 * @returns {Function} 
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
