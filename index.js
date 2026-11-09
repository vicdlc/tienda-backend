require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('./config/redis');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas de la API
app.use('/api/productos', require('./routes/productos'));

// Conexión a MongoDB
const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
mongoose.connect(uri)
  .then(() => console.log('🟢 Conectado exitosamente a MongoDB'))
  .catch(err => console.error('🔴 Error al conectar a MongoDB:', err));

app.get('/', (req, res) => {
  res.send('API REST de la tienda funcionando correctamente 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🟡 Servidor corriendo en el puerto ${PORT}`);
});