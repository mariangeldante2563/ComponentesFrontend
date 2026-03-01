
// Configuración de conexión a MongoDB


const mongoose = require('mongoose');

/**
 * Conecta a la base de datos MongoDB utilizando
 * @returns {Promise<void>}
 * @throws {Error} 
 */
async function connectDB() {
    try {
        const uri = process.env.MONGODB_URI
            || 'mongodb://localhost:27017/attendance_system';

        await mongoose.connect(uri);

        console.log('[DATABASE] Conexión exitosa a MongoDB');

        // Eventos de conexión para monitoreo
        mongoose.connection.on('error', (error) => {
            console.error('[DATABASE] Error en la conexión:', error.message);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('[DATABASE] Desconectado de MongoDB');
        });
    } catch (error) {
        console.error('[DATABASE] No se pudo conectar a MongoDB:', error.message);
        throw error;
    }
}

/**
 * Desconecta de la base de datos MongoDB.
 * Útil para pruebas y cierre limpio del servidor.
 * @returns {Promise<void>}
 */
async function disconnectDB() {
    try {
        await mongoose.disconnect();
        console.log('[DATABASE] Desconexión exitosa de MongoDB');
    } catch (error) {
        console.error('[DATABASE] Error al desconectar:', error.message);
        throw error;
    }
}

module.exports = { connectDB, disconnectDB };
