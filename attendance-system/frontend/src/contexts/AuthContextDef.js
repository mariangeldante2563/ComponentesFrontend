import { createContext } from 'react'

// Contexto de autenticación (separado para compatibilidad con Fast Refresh)
const AuthContext = createContext(null)

export default AuthContext
