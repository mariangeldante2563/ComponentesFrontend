import mongoose from 'mongoose'

export async function connectDB() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error('Falta la variable de entorno MONGODB_URI')
  }

  // Opciones recomendadas para conexiones modernas
  await mongoose.connect(uri, {
    autoIndex: true,
  })

  mongoose.connection.on('connected', () => {
    console.log('MongoDB conectado')
  })

  mongoose.connection.on('error', (err) => {
    console.error('Error de MongoDB:', err)
  })
}
