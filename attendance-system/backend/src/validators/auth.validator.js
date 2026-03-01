// ============================================
// Validaciones para rutas de autenticación
// ============================================
// Define reglas de validación usando
// express-validator para cada endpoint.

const { body } = require('express-validator');

// ============================================
// Validación de registro de usuario
// ============================================

const registerValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre debe tener entre 2 y 100 caracteres'),

    body('email')
        .trim()
        .notEmpty().withMessage('El correo es obligatorio')
        .isEmail().withMessage('Formato de correo inválido')
        .normalizeEmail(),

    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres'),

    body('role')
        .optional()
        .isIn(['employee', 'admin'])
        .withMessage('El rol debe ser employee o admin'),
];

// ============================================
// Validación de inicio de sesión
// ============================================

const loginValidation = [
    body('email')
        .trim()
        .notEmpty().withMessage('El correo es obligatorio')
        .isEmail().withMessage('Formato de correo inválido')
        .normalizeEmail(),

    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria'),
];

// ============================================
// Validación de recuperación de contraseña
// ============================================

const forgotPasswordValidation = [
    body('email')
        .trim()
        .notEmpty().withMessage('El correo es obligatorio')
        .isEmail().withMessage('Formato de correo inválido')
        .normalizeEmail(),
];

module.exports = {
    registerValidation,
    loginValidation,
    forgotPasswordValidation,
};
