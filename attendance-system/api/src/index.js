import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import { connectDB } from './config/db.js'

// Cargar variables de entorno
dotenv.config()

const app = express()
const port = process.env.PORT || 4000

// Middlewares base
app.use(cors())
app.use(express.json())

// Rutas
app.use('/api/auth', authRoutes)

// Ruta de salud
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() })
})

// Arrancar servidor solo tras conectar a la base de datos
connectDB().then(() => {
  app.listen(port, () => {
    // Log simple para confirmar inicio
    console.log(`API escuchando en http://localhost:${port}`)
  })
}).catch((err) => {
  console.error('No se pudo iniciar la API', err)
  process.exit(1)
})
