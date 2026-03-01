
// Modelo de Asistencia - Attendance

const mongoose = require('mongoose');

// Esquema de asistencia con validaciones
const attendanceSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'El usuario es obligatorio'],
        },
        date: {
            type: Date,
            required: [true, 'La fecha es obligatoria'],
            default: () => {
                const now = new Date();
                return new Date(now.getFullYear(), now.getMonth(), now.getDate());
            },
        },
        checkIn: {
            type: Date,
            default: null,
        },
        checkOut: {
            type: Date,
            default: null,
        },
        status: {
            type: String,
            enum: {
                values: ['present', 'late', 'absent'],
                message: 'El estado debe ser present, late o absent',
            },
            default: 'present',
        },
        hoursWorked: {
            type: Number,
            default: 0,
            min: [0, 'Las horas trabajadas no pueden ser negativas'],
        },
        notes: {
            type: String,
            trim: true,
            maxlength: [500, 'Las notas no pueden exceder 500 caracteres'],
            default: '',
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

// Índice compuesto: un registro por usuario/día

attendanceSchema.index({ user: 1, date: 1 }, { unique: true });

// Método de instancia: calcular horas trabajadas

/**
 * @returns {number} 
 */
attendanceSchema.methods.calculateHours = function () {
    if (this.checkIn && this.checkOut) {
        const diffMs = this.checkOut.getTime() - this.checkIn.getTime();
        this.hoursWorked = Math.round((diffMs / (1000 * 60 * 60)) * 100) / 100;
    }
    return this.hoursWorked;
};

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
