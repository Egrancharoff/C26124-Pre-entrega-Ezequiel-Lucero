//array para guardar los articulos en el carrito
let carrito = [];

//funcion para mostrar los productos desde el JSON
function cargarProductos() {
    fetch('js/productos.json')
        .then(response => response.json())
        .then(productos =>{
            mostrarProductos(productos);
        })
        .catch(error => {console.error('Error al cargar los productos:', error);});
}

//funcion para renderizar cada producto dentro de su div
function mostrarProductos(productos) {
    const contenedor = document.getElementById('productos');
    contenedor.innerHTML = ''; //Limpiar el contenedor antes de agregar los productos

    productos.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('producto-card');

        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p class="categoria">Categoria: ${producto.categoria}</p>
            <p class="descripcion">Descripcion: ${producto.descripcion}</p>
            <p class="precio">Precio: $${producto.precio}</p>
            <button class="boton" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        `;

        contenedor.appendChild(card);

        const botonAgregar = card.querySelector('.agregar-al-carrito');
        botonAgregar.addEventListener('click', () =>
            agregarAlCarrito(producto));
    });
}

//Agregar producto o sumar la cantidad si ya existe
function agregarAlCarrito(productos) {
    const productoExistente = carrito.find(item => item.id === productos.id);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ ...productos, cantidad: 1 });
    }

    actualizarCarrito();
}

//Quitar producto del carrito
function quitarDelCarrito(productoId) {
    carrito = carrito.filter(item => item.id !== productoId);
    actualizarCarrito();
}

//Actualizar el carrito en el DOM
function actualizarCarrito() {
    const lista = document.getElementById('lista-carrito');
    const total = document.getElementById('total');
    lista.innerHTML = ''; //Limpiar la lista antes de agregar los productos
    let suma = 0;

    carrito.forEach(item => {
        const li = document.createElement('li');
        const subtotal = item.precio * item.cantidad;
        suma += subtotal;

        li.innerHTML = `
            ${item.nombre} - $${item.precio} x ${item.cantidad} = $${subtotal}
            <button class="boton" onclick="quitarDelCarrito(${item.id})">Quitar</button>
        `;
        lista.appendChild(li);

        li.querySelector('.quitar-item').addEventListener('click', () => {
            quitarDelCarrito(item.id);
        }); 
    });

    total.textContent = `Total: $${s}`;
}

//Finalizar compra
function finalizarCompra() {
    if (carrito.length === 0) {
        alert('El carrito está vacío. Agrega productos antes de finalizar la compra.');
        return;
    }
    alert('Compra finalizada. Gracias por su compra!');
    vaciarCarrito();
}

//Conectar los botones del carrito
document.getElementById('finalizar-compra').addEventListener('click', finalizarCompra);
document.getElementById('vaciar-carrito').addEventListener('click', vaciarCarrito);

function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}

//Iniciar todo al cargar la pagina

cargarProductos();
