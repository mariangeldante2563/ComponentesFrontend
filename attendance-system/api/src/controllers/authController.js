import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'

// Genera un JWT simple con el id y rol del usuario
function signToken(user) {
  if (!process.env.JWT_SECRET) {
    throw new Error('Falta la variable de entorno JWT_SECRET')
  }
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  })
}

export async function register(req, res) {
  const { name, email, password, role = 'employee' } = req.body

  const exists = await User.findOne({ email })
  if (exists) {
    return res.status(409).json({ message: 'El correo ya está registrado' })
  }

  const hashed = await bcrypt.hash(password, 10)
  const user = await User.create({ name, email, password: hashed, role })

  const token = signToken(user)
  res.status(201).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  })
}

export async function login(req, res) {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    return res.status(401).json({ message: 'Credenciales inválidas' })
  }

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    return res.status(401).json({ message: 'Credenciales inválidas' })
  }

  const token = signToken(user)
  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  })
}

export async function profile(req, res) {
  const user = await User.findById(req.user.id).select('-password')
  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' })
  }
  res.json({ user })
}

// Ruta simulada de recuperación de contraseña.
// En un entorno real se enviaría un correo con un token temporal.
export async function forgotPassword(req, res) {
  const { email } = req.body
  const exists = await User.findOne({ email })
  if (!exists) {
    return res.status(404).json({ message: 'Usuario no encontrado' })
  }
  return res.json({ ok: true, message: 'Se envió un enlace de recuperación (simulado)' })
}
