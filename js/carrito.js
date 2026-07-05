// Array para guardar los productos y el carrito
let productos = [];
let carrito = [];

// Cargar productos desde el JSON
function cargarProductos() {
    fetch("js/productos.json")
        .then(response => response.json())
        .then(data => {
            productos = data;
            mostrarProductos();
        })
        .catch(error => console.error("Error al cargar productos:", error));
}

// Mostrar productos en pantalla
function mostrarProductos() {
    const contenedor = document.getElementById("productos");
    contenedor.innerHTML = "";

    productos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("producto-card");

        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p><strong>Categoría:</strong> ${producto.categoria}</p>
            <p>${producto.descripcion}</p>
            <p><strong>Precio:</strong> $${producto.precio}</p>
            <button class="boton">Agregar al carrito</button>
        `;

        card.querySelector("button").addEventListener("click", () => {
            agregarAlCarrito(producto.id);
        });

        contenedor.appendChild(card);
    });
}

// Agregar producto al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);

    const existente = carrito.find(item => item.id === id);

    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }

    actualizarCarrito();
}

// Quitar producto del carrito
function quitarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
}

// Actualizar carrito
function actualizarCarrito() {
    const lista = document.getElementById("lista-carrito");
    const total = document.getElementById("total");

    lista.innerHTML = "";

    let suma = 0;

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        suma += subtotal;

        const li = document.createElement("li");

        li.innerHTML = `
            ${item.nombre} - ${item.cantidad} x $${item.precio.toFixed(2)} = $${subtotal.toFixed(2)}
            <button class="boton">x</button>
        `;

        li.querySelector("button").addEventListener("click", () => {
            quitarDelCarrito(item.id);
        });

        lista.appendChild(li);
    });

    total.textContent = suma.toFixed(2);
}

// Vaciar carrito
function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}

// Finalizar compra
function finalizarCompra() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    alert("¡Compra realizada con éxito!");

    vaciarCarrito();
}

// Eventos
document.getElementById("vaciar-carrito").addEventListener("click", vaciarCarrito);
document.getElementById("finalizar-compra").addEventListener("click", finalizarCompra);

// Iniciar
cargarProductos();