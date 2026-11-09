document.addEventListener("DOMContentLoaded", () => {
    obtenerCatalogo();
});

async function obtenerCatalogo() {
    try {
        // Hacemos la petición GET a tu API de Node.js
        const respuesta = await fetch('http://localhost:3000/api/productos');
        const productos = await respuesta.json();

        const contenedorCatalogo = document.getElementById('catalogo');
        contenedorCatalogo.innerHTML = ''; 

        // Recorremos cada producto que llegó de MongoDB/Redis
        productos.forEach(producto => {
            const tarjeta = document.createElement('div');
            tarjeta.className = 'tarjeta-producto';

            // Verificamos si tiene imagen en Cloudinary, si no, ponemos una genérica
            const imagen = producto.imagenUrl ? producto.imagenUrl : 'https://via.placeholder.com/200';

            tarjeta.innerHTML = `
                <img src="${imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p><strong>Marca:</strong> ${producto.marca}</p>
                <p class="precio">$${producto.precio}</p>
                <p><small>Stock: ${producto.stock}</small></p>
            `;

            contenedorCatalogo.appendChild(tarjeta);
        });

    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
}