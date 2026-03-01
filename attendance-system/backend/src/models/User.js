// ============================================
// Modelo de Usuario - User
// ============================================
// Define el esquema de usuario para MongoDB.
// Incluye campos de nombre, email, contraseña
// y rol, con hash automático de contraseña.

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Esquema de usuario con validaciones
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'El nombre es obligatorio'],
            trim: true,
            minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
            maxlength: [100, 'El nombre no puede exceder 100 caracteres'],
        },
        email: {
            type: String,
            required: [true, 'El correo es obligatorio'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                'Formato de correo inválido',
            ],
        },
        password: {
            type: String,
            required: [true, 'La contraseña es obligatoria'],
            minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
            select: false,
        },
        role: {
            type: String,
            enum: {
                values: ['employee', 'admin'],
                message: 'El rol debe ser employee o admin',
            },
            default: 'employee',
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

// ============================================
// Middleware pre-save: hashear contraseña
// ============================================
// Solo se ejecuta cuando la contraseña ha sido
// modificada, evitando doble hash en updates.

userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }

    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
});

// ============================================
// Método de instancia: comparar contraseñas
// ============================================

/**
 * Compara una contraseña en texto plano con
 * el hash almacenado en la base de datos.
 * @param {string} candidatePassword - Contraseña a verificar
 * @returns {Promise<boolean>} true si coincide
 */
userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error('Error al comparar contraseñas');
    }
};

// ============================================
// Método de instancia: convertir a JSON seguro
// ============================================
// Excluye la contraseña al serializar el usuario

userSchema.methods.toSafeObject = function () {
    return {
        _id: this._id,
        name: this.name,
        email: this.email,
        role: this.role,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    };
};

const User = mongoose.model('User', userSchema);

module.exports = User;
