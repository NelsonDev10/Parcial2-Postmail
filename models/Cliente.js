const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  creditos: { type: Number, default: 10 } 
});

module.exports = mongoose.model('Cliente', clienteSchema);
