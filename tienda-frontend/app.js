document.addEventListener("DOMContentLoaded", () => {
    obtenerCatalogo();
});

async function obtenerCatalogo() {
    try {
        const respuesta = await fetch('https://tienda-backend-j3p4.onrender.com/api/productos');
        const productos = await respuesta.json();

        const contenedorCatalogo = document.getElementById('catalogo');
        contenedorCatalogo.innerHTML = ''; 

        productos.forEach(producto => {
            const tarjeta = document.createElement('div');
            tarjeta.className = 'tarjeta-producto';

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