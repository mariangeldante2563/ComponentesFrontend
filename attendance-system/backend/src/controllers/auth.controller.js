
// Controlador de Autenticación
// Maneja la lógica de registro, inicio de sesión
// y recuperación de contraseña.

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Función auxiliar: generar token JWT

/**
 * @param {Object} user 
 * @returns {string} 
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

// POST /api/auth/register - Registro de usuario

/**
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
async function register(req, res, next) {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'El correo ya se encuentra registrado',
            });
        }

        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password,
            role: role || 'employee',
        });

        const token = generateToken(user);

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

// POST /api/auth/login - Inicio de sesión

/**
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email.toLowerCase() })
            .select('+password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Error en la autenticación - Credenciales incorrectas',
            });
        }

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

// POST /api/auth/forgot - Recuperar contraseña

/**
 * de correo electrónico real.
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
async function forgotPassword(req, res, next) {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'No se encontró un usuario con ese correo',
            });
        }

        // En producción: generar token de reset y enviar email
        res.status(200).json({
            success: true,
            message: 'Enlace de recuperación enviado al correo',
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { register, login, forgotPassword };
