import jwt from 'jsonwebtoken'

// Middleware para proteger rutas que requieren autenticación
export function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null

  if (!token) {
    return res.status(401).json({ message: 'Token requerido' })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = payload
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido o expirado' })
  }
}
