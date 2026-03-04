import { useContext } from 'react'
import AuthContext from '../contexts/AuthContextDef'

/**
 * Hook para consumir el contexto de autenticación.
 * Debe usarse dentro de un AuthProvider.
 */
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}
