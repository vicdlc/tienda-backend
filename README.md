# E-Commerce TechForge - Base de Datos NoSQL (Entregable 1)

**Institución:** Instituto Politécnico Nacional (IPN) - UPIICSA  
**Carrera:** Licenciatura en Ciencias de la Informática  
**Unidad de Aprendizaje:** Bases de Datos No SQL  
**Secuencia:** 6CM68  
**Profesor:** Entzana Garduño Yventz  

### Integrantes del Equipo:
* Gutiérrez Díaz Rubén Agustín
* Lorenzo Cruz Victor David
* Melo Manriquez Dante Isaias
* Soriano Nieva Miguel

---

## Estructura del Proyecto 

# Catálogo de Productos - API REST & Web App

Aplicación web full-stack diseñada para la gestión y visualización de un catálogo de productos en tiempo real, optimizada con caché de alto rendimiento y almacenamiento multimedia en la nube.

---

## ¿Qué hace este proyecto?
Este sistema permite administrar y consultar un inventario de productos de forma pública y eficiente. Sus funciones principales incluyen:
* **Visualización de Catálogo:** Interfaz web limpia y responsiva que renderiza dinámicamente las tarjetas de los productos con sus respectivas imágenes, precios, marcas y stock.
* **Gestión de Multimedia en la Nube:** Soporte para carga, procesamiento y entrega rápida de imágenes de productos optimizadas mediante Cloudinary.
* **Persistencia de Datos:** Almacenamiento seguro y estructurado de la información de los productos en la nube mediante MongoDB Atlas.
* **Optimización de Rendimiento:** Implementación de Redis para el almacenamiento en caché de peticiones frecuentes, reduciendo la latencia y mejorando la velocidad de respuesta del servidor.

---

## Arquitectura y Tecnologías Utilizadas

El proyecto está dividido en una arquitectura desacoplada (Frontend y Backend independientes):

### Backend (API REST)
* **Node.js & Express:** Entorno de ejecución y framework minimalista para la creación de rutas, controladores y lógica de negocio.
* **MongoDB Atlas & Mongoose:** Base de datos NoSQL en la nube para el almacenamiento de esquemas de productos.
* **Redis:** Sistema de almacenamiento de estructura de datos en memoria utilizado como caché para acelerar las consultas.
* **Cloudinary:** Servicio en la nube para la gestión y alojamiento de imágenes.
* **CORS:** Middleware de seguridad para permitir la comunicación controlada entre los dominios del cliente y del servidor.

### Frontend (Interfaz de Usuario)
* **HTML5, CSS3 & JavaScript (Vanilla):** Estructura, diseño de componentes en tarjetas y consumo asíncrono de la API mediante la API `fetch`.

### Infraestructura y Despliegue (Cloud)
* **Render.com:** Alojamiento y despliegue continuo del servidor Backend (API 24/7).
* **Netlify:** Alojamiento estático global para el despliegue del Frontend.
* **Git & GitHub:** Control de versiones del código fuente.

---

## ¿Cómo funciona el flujo de datos?
1. El usuario ingresa a la interfaz web alojada en **Netlify**.
2. El navegador ejecuta un script en JavaScript (`app.js`) que realiza una petición HTTP asíncrona (`fetch`) hacia el servidor backend en **Render**.
3. El backend procesa la petición consultando la capa de caché en **Redis**; si el dato no está cacheado, lo recupera directamente desde la base de datos en **MongoDB Atlas**.
4. La API responde con la lista de productos en formato JSON, incluyendo los enlaces seguros de las imágenes gestionadas por **Cloudinary**.
5. El frontend recibe los datos y construye dinámicamente las tarjetas visuales en el DOM para el usuario final.


## 🔗 Enlaces del Proyecto
* **Sitio Web (Frontend - Netlify):** [https://tu-sitio.netlify.app](https://tu-sitio.netlify.app)
* **API REST (Backend - Render):** [https://tienda-backend-j3p4.onrender.com/api/productos](https://tienda-backend-j3p4.onrender.com/api/productos)