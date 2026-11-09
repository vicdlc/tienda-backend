const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  marca: { type: String, required: true },
  categoria: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  imagenUrl: { type: String },
  
  // ESTA ES LA PARTE POLIMÓRFICA:
  // Permite insertar cualquier par de clave-valor dependiendo del producto.
  especificaciones: {
    type: Map,
    of: mongoose.Schema.Types.Mixed 
  }
}, { timestamps: true });
module.exports = mongoose.model('Producto', productoSchema);
