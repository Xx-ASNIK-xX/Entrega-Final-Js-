// Declaración de un array llamado "productos" que contiene varios objetos.
const productos = [
    { 
        id: 1, 
        nombre: "camaras de seguridad", 
        precio: 10, 
        descripcion: "Esta es la descripción del producto 1.", 
        marca: "Marca 1", 
        stock: 11
    },
    { 
        id: 2, 
        nombre: "Producto 2", 
        precio: 20, 
        descripcion: "Esta es la descripción del producto 2.", 
        marca: "Marca 2", 
        stock: 3
    },
    { 
        id: 3, 
        nombre: "Producto 3", 
        precio: 30, 
        descripcion: "Esta es la descripción del producto 3.", 
        marca: "Marca 3", 
        stock: 4
    },
    { 
        id: 4, 
        nombre: "Producto 4", 
        precio: 40, 
        descripcion: "Esta es la descripción del producto 4.", 
        marca: "Marca 4", 
        stock: 2
    },
    { 
        id: 5, 
        nombre: "Producto 5", 
        precio: 50, 
        descripcion: "Esta es la descripción del producto 5.", 
        marca: "Marca 5", 
        stock: 5
    }
];

// Función para mostrar los productos en la tienda
function mostrarProductos() {
    const productosDiv = document.getElementById("productos");
    productosDiv.innerHTML = "";

    productos.forEach(producto => {
        const productoDiv = document.createElement("div");
        productoDiv.classList.add("producto");
        productoDiv.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <p>Stock: ${producto.stock}</p>
            <input type="number" id="cantidad-${producto.id}" min="1" max="${producto.stock}" value="1" onchange="validarCantidad(${producto.id})">
            <button onclick="agregarAlCarrito(${producto.id})" id="agregarBtn-${producto.id}" ${producto.stock === 0 ? 'disabled' : ''}>${producto.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}</button>
        `;
        productosDiv.appendChild(productoDiv);
    });
}

// Función para agregar un producto al carrito con una cierta cantidad
function agregarAlCarrito(id) {
    const cantidadInput = document.getElementById(`cantidad-${id}`);
    const cantidad = parseInt(cantidadInput.value);
    const producto = productos.find(item => item.id === id);

    if (!producto) {
        alert('El producto no existe.');
        return;
    }

    if (cantidad < 1) {
        alert('La cantidad debe ser mayor que 0.');
        return;
    }

    // Sumar la cantidad seleccionada con la cantidad que ya está en el carrito
    const cantidadTotalEnCarrito = carrito.reduce((total, item) => {
        if (item.id === id) {
            return total + item.cantidad;
        }
        return total;
    }, 0) + cantidad;

    // Verificar si la cantidad total excede el stock disponible
    if (cantidadTotalEnCarrito > producto.stock) {
        alert('La cantidad seleccionada excede el stock disponible.');
        return;
    }

    // Agregar el producto con la cantidad al carrito
    const productoEnCarrito = { ...producto, cantidad };
    carrito.push(productoEnCarrito);
    mostrarCarrito();

    // Actualizar el estado de los botones de agregar al carrito
    mostrarProductos();

    // Calcular y mostrar el valor total de la compra
    calcularTotalCompra();
}

// Función para mostrar los productos en el carrito
function mostrarCarrito() {
    const carritoDiv = document.getElementById("carrito");
    carritoDiv.innerHTML = "";

    carrito.forEach((item, index) => {
        const carritoItem = document.createElement("div");
        carritoItem.classList.add("carrito-item");
        carritoItem.innerHTML = `
            <p>${item.nombre} - Cantidad: ${item.cantidad} - $${item.precio * item.cantidad}</p>
            <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        carritoDiv.appendChild(carritoItem);
    });
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1); // Eliminar el producto del carrito
    mostrarCarrito(); // Volver a mostrar el carrito actualizado

    // Actualizar el estado de los botones de agregar al carrito
    mostrarProductos();

    // Calcular y mostrar el valor total de la compra
    calcularTotalCompra();
}

// Función para validar la cantidad ingresada en el input
function validarCantidad(id) {
    const cantidadInput = document.getElementById(`cantidad-${id}`);
    const cantidad = parseInt(cantidadInput.value);
    const agregarBtn = document.getElementById(`agregarBtn-${id}`);
    const producto = productos.find(item => item.id === id);

    if (cantidad > producto.stock || cantidad < 1) {
        agregarBtn.disabled = true;
    } else {
        agregarBtn.disabled = false;
    }
}

// Función para calcular el valor total de la compra
function calcularTotalCompra() {
    let totalCompra = 0;

    carrito.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad;
    });

    // Mostrar el total de la compra
    const totalCompraSpan = document.getElementById("totalCompra");
    totalCompraSpan.textContent = `$${totalCompra.toFixed(2)}`;
}

// Función para comprar los productos en el carrito
function comprarProductos() {
    // Verificar si el carrito está vacío
    if (carrito.length === 0) {
        alert('El carrito está vacío. Agrega productos antes de comprar.');
        return; // Salir de la función si el carrito está vacío
    }

    // Verificar si hay suficiente stock para cada producto en el carrito
    const productosEnCarrito = carrito.map(item => {
        const producto = productos.find(p => p.id === item.id);
        return { ...producto, cantidad: item.cantidad };
    });

    const productosSinStockSuficiente = productosEnCarrito.filter(producto => producto.cantidad > producto.stock);
    if (productosSinStockSuficiente.length > 0) {
        const nombresProductosSinStock = productosSinStockSuficiente.map(producto => producto.nombre).join(', ');
        alert(`La cantidad de los siguientes productos excede el stock disponible: ${nombresProductosSinStock}`);
        return; // Salir de la función si hay productos sin stock suficiente
    }

    // Calcular el valor total de la compra
    const totalCompra = carrito.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);

    // Lógica para procesar la compra
    let mensaje = 'Productos comprados:\n';
    carrito.forEach(producto => {
        mensaje += `${producto.nombre} - Cantidad: ${producto.cantidad} - $${producto.precio * producto.cantidad}\n`;
       
        // Restar la cantidad comprada del stock disponible del producto
        const productoIndex = productos.findIndex(item => item.id === producto.id);
        if (productoIndex !== -1) {
            productos[productoIndex].stock -= producto.cantidad;
        }
    });
    mensaje += `\nTotal de la compra: $${totalCompra.toFixed(2)}\n\nGracias por su compra!`;
    alert(mensaje);

    // Vaciar el carrito después de realizar la compra
    carrito = [];
    mostrarCarrito();

    // Actualizar el estado de los botones de agregar al carrito después de la compra
    mostrarProductos();
}

// Array para almacenar los productos en el carrito
let carrito = [];

// Mostrar los productos al cargar la página
window.addEventListener("load", () => {
    mostrarProductos();
});