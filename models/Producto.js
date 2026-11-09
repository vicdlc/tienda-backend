const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  marca: { type: String, required: true },
  categoria: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  imagenUrl: { type: String }, // Aquí irá el link de Firebase/Cloud Storage después
  
  // ESTA ES LA PARTE POLIMÓRFICA:
  // Permite insertar cualquier par de clave-valor dependiendo del producto.
  especificaciones: {
    type: Map,
    of: mongoose.Schema.Types.Mixed 
  }
}, { timestamps: true }); // Agrega fecha de creación y actualización automáticamente

module.exports = mongoose.model('Producto', productoSchema);
