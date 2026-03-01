// ============================================
// Archivo principal del servidor - Entry Point
// ============================================
// Carga las variables de entorno, conecta a la
// base de datos y levanta el servidor Express.

const app = require('./app');
const { connectDB } = require('./config/database');

// Puerto del servidor desde variables de entorno
const PORT = process.env.PORT || 4000;

/**
 * Función principal que inicia el servidor.
 * Primero conecta a MongoDB y luego pone a
 * escuchar el servidor en el puerto configurado.
 */
async function startServer() {
    try {
        // Conectar a la base de datos MongoDB
        await connectDB();

        // Iniciar el servidor HTTP
        app.listen(PORT, () => {
            console.log(`[SERVER] Servidor corriendo en http://localhost:${PORT}`);
            console.log(`[SERVER] Entorno: ${process.env.NODE_ENV || 'development'}`);
        });
    } catch (error) {
        // Si falla la conexión, se detiene el proceso
        console.error('[SERVER] Error al iniciar el servidor:', error.message);
        process.exit(1);
    }
}

// Ejecutar la función principal
startServer();
