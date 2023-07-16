class ProductManager {
    constructor() {
        this.products = [];
    }

    static id = 0;


    agregarProducto(titulo, descripcion, precio, imagen, codigo, existencias) {
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].codigo === codigo) {
                console.log(`El codigo ${codigo} ya se encuentra agregado \n`);
                break;
            }
        }


        const nuevoProducto = {
            titulo,
            descripcion,
            precio,
            imagen,
            codigo,
            existencias
        };

        if (!Object.values(nuevoProducto).includes(undefined)) {
            ProductManager.id++
            this.products.push({ ...nuevoProducto, id: ProductManager.id });
        } else {
            console.log("Todos los Campos son requeridos, debe haber algun campo sin diligenciar");
        }
    }

    obtenerProductos() {
        return this.products;
    }

    busquedaProducto(id) {
        return this.products.find((productos) => productos.id === id)
    }


    ObtenerProductosPorId(id) { !this.busquedaProducto(id) ? console.log("No Existe el producto") : console.log(this.busquedaProducto(id)) }

}

const productos = new ProductManager

// Primer test de productos mostrando el array vacio por que esta recien creado 
console.log(productos.obtenerProductos(), "El Array se encuentra Vacio \n");

// Agregamos un producto para ver que si nos queda agregado en el array 
productos.agregarProducto("Elementos", "Pelicula Infantil muy animada", 10000, "imagen1", "1234ABC", 10);
productos.agregarProducto("sirenita", "Pelicula Infantil", 2000, "imagen2", "ABC123", 5);

// Realizamos de nuevo la consulta de los productos que hay en el Array, nos debe mostrar los que agregamos
console.log(productos.obtenerProductos(), "\n");

// Agregamos un producto con un codigo repetido pero datos diferentes para validar que no se repita el Codigo
productos.agregarProducto("Mohana", "Pelicula Infantil animada ", 5000, "imagen3", "ABC123", 7);

// Buscamos el producto por id para saber si existe o no 
productos.ObtenerProductosPorId(2);


