import { Router } from 'express'
import { body } from 'express-validator'
import { forgotPassword, login, profile, register } from '../controllers/authController.js'
import { validateRequest } from '../middleware/validateRequest.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// Validaciones comunes
const emailField = body('email').isEmail().withMessage('Correo inválido').normalizeEmail()
const passwordField = body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')

router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('El nombre es obligatorio').trim(),
    emailField,
    passwordField,
    body('role').optional().isIn(['employee', 'admin']).withMessage('Rol no permitido'),
  ],
  validateRequest,
  register,
)

router.post(
  '/login',
  [emailField, passwordField],
  validateRequest,
  login,
)

router.get('/profile', requireAuth, profile)

router.post(
  '/forgot',
  [emailField],
  validateRequest,
  forgotPassword,
)

export default router
