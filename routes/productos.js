const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');
const redisClient = require('../config/redis'); 
const cloudinary = require('../config/cloudinary'); // Importamos Cloudinary en lugar de Firebase
const multer = require('multer');
const streamifier = require('streamifier'); // Necesario para subir a Cloudinary desde memoria

// Configurar multer para almacenar el archivo temporalmente en memoria
const upload = multer({ storage: multer.memoryStorage() });

// Endpoint POST: Crear producto + Subir imagen a Cloudinary
router.post('/', upload.single('imagen'), async (req, res) => {
  try {
    let imagenUrl = '';

    // Si el cliente adjuntó un archivo de imagen, lo subimos a Cloudinary
    if (req.file) {
      const subirACloudinary = (fileBuffer) => {
        return new Promise((resolve, reject) => {
          let stream = cloudinary.uploader.upload_stream(
            { folder: 'tienda-steren' }, // Se creará esta carpeta en tu Cloudinary
            (error, result) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            }
          );
          streamifier.createReadStream(fileBuffer).pipe(stream);
        });
      };

      const resultadoCloudinary = await subirACloudinary(req.file.buffer);
      imagenUrl = resultadoCloudinary.secure_url; // Obtenemos el link seguro de la imagen
    }

    // Parsear especificaciones si vienen como texto desde Postman (form-data)
    let especificacionesParsed = req.body.especificaciones;
    if (typeof especificacionesParsed === 'string') {
      try {
        especificacionesParsed = JSON.parse(especificacionesParsed);
      } catch (e) {
        // Ignorar si no es JSON válido
      }
    }

    // Creamos el nuevo producto incluyendo la URL de Cloudinary
    const nuevoProductoData = {
      ...req.body,
      imagenUrl: imagenUrl
    };

    if (especificacionesParsed) {
      nuevoProductoData.especificaciones = especificacionesParsed;
    }

    const nuevoProducto = new Producto(nuevoProductoData);
    const productoGuardado = await nuevoProducto.save();
    
    // Invalidar/borrar la caché del catálogo para que se actualice
    await redisClient.del('catalogo_productos');
    console.log('🧹 Caché de Redis invalidada por inserción de nuevo producto');

    res.status(201).json(productoGuardado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al guardar el producto con imagen', error: error.message });
  }
});

// Endpoint GET: Obtener el catálogo usando Redis como caché
router.get('/', async (req, res) => {
  try {
    const cacheKey = 'catalogo_productos';

    const productosCache = await redisClient.get(cacheKey);
    if (productosCache) {
      console.log('⚡ Sirviendo datos desde la caché de Redis');
      return res.status(200).json(JSON.parse(productosCache));
    }

    const productos = await Producto.find();
    await redisClient.setEx(cacheKey, 60, JSON.stringify(productos));

    console.log('🐢 Sirviendo datos desde MongoDB y guardando en Redis');
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el catálogo', error: error.message });
  }
});

module.exports = router;