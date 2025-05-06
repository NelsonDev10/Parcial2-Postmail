const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
    descripcion: { type: String, required: true },
    peso: { type: Number, required: true },
    bultos: { type: Number, required: true },
    fecha_entrega: { type: Date, required: true }
});

module.exports = mongoose.model('Producto', ProductoSchema);