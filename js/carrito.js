//array para guardar los articulos en el carrito
let carrito = [];

//funcion para mostrar los productos desde el JSON
function mostrarProductos() {
    fetch('js/productos.json')
        .then(response => response.json())
        .then(productos =>{
            mostrarProductos(productos);
        })
        .catch(error => {console.error('Error al cargar los productos:', error);});
}

