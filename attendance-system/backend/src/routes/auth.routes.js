// ============================================
// Rutas de Autenticación
// ============================================
// Define las rutas para registro, login y
// recuperación de contraseña.

const { Router } = require('express');
const { register, login, forgotPassword } = require('../controllers/auth.controller');
const { validate } = require('../middlewares/validate');
const {
    registerValidation,
    loginValidation,
    forgotPasswordValidation,
} = require('../validators/auth.validator');

const router = Router();

// ============================================
// POST /api/auth/register
// Crea un nuevo usuario con validación de datos
// ============================================

router.post('/register', registerValidation, validate, register);

// ============================================
// POST /api/auth/login
// Autentica un usuario existente
// ============================================

router.post('/login', loginValidation, validate, login);

// ============================================
// POST /api/auth/forgot
// Solicita recuperación de contraseña
// ============================================

router.post('/forgot', forgotPasswordValidation, validate, forgotPassword);

module.exports = router;
