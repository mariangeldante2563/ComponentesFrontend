// ============================================
// Controlador de Autenticación
// ============================================
// Maneja la lógica de registro, inicio de sesión
// y recuperación de contraseña.

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ============================================
// Función auxiliar: generar token JWT
// ============================================

/**
 * Genera un token JWT firmado con los datos
 * del usuario proporcionado.
 * @param {Object} user - Documento de usuario de MongoDB
 * @returns {string} Token JWT firmado
 */
function generateToken(user) {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
    };

    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );
}

// ============================================
// POST /api/auth/register - Registro de usuario
// ============================================

/**
 * Crea un nuevo usuario en la base de datos.
 * Retorna el token JWT y los datos del usuario.
 * @param {Object} req - Request con { name, email, password, role }
 * @param {Object} res - Response
 * @param {Function} next - Siguiente middleware
 */
async function register(req, res, next) {
    try {
        const { name, email, password, role } = req.body;

        // Verificar si el email ya está registrado
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'El correo ya se encuentra registrado',
            });
        }

        // Crear nuevo usuario en la base de datos
        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password,
            role: role || 'employee',
        });

        // Generar token JWT para autenticación inmediata
        const token = generateToken(user);

        // Responder con token y datos seguros del usuario
        res.status(201).json({
            success: true,
            message: 'Autenticación satisfactoria - Usuario registrado correctamente',
            token,
            user: user.toSafeObject(),
        });
    } catch (error) {
        next(error);
    }
}

// ============================================
// POST /api/auth/login - Inicio de sesión
// ============================================

/**
 * Autentica un usuario existente con email y
 * contraseña. Retorna token JWT si es correcto.
 * @param {Object} req - Request con { email, password }
 * @param {Object} res - Response
 * @param {Function} next - Siguiente middleware
 */
async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        // Buscar usuario incluyendo el campo password
        const user = await User.findOne({ email: email.toLowerCase() })
            .select('+password');

        // Si no existe el usuario, devolver error
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Error en la autenticación - Credenciales incorrectas',
            });
        }

        // Comparar la contraseña proporcionada con el hash
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Error en la autenticación - Credenciales incorrectas',
            });
        }

        // Generar token JWT
        const token = generateToken(user);

        // Responder con token y datos seguros del usuario
        res.status(200).json({
            success: true,
            message: 'Autenticación satisfactoria',
            token,
            user: user.toSafeObject(),
        });
    } catch (error) {
        next(error);
    }
}

// ============================================
// POST /api/auth/forgot - Recuperar contraseña
// ============================================

/**
 * Simula el envío de un correo de recuperación.
 * En producción se integraría con un servicio
 * de correo electrónico real.
 * @param {Object} req - Request con { email }
 * @param {Object} res - Response
 * @param {Function} next - Siguiente middleware
 */
async function forgotPassword(req, res, next) {
    try {
        const { email } = req.body;

        // Verificar que el usuario existe
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'No se encontró un usuario con ese correo',
            });
        }

        // En producción: generar token de reset y enviar email
        // Por ahora se simula el envío exitoso
        res.status(200).json({
            success: true,
            message: 'Enlace de recuperación enviado al correo',
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { register, login, forgotPassword };
