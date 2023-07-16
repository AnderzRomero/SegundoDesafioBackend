import { promises as fs } from "fs"

class ProductManager {
    constructor() {
        this.patch = "./productos.json"
        this.products = [];
    }

    static id = 0;

    agregarProducto = async (titulo, descripcion, precio, imagen, codigo, existencias) => {

        ProductManager.id++

        let nuevoProducto = {
            titulo,
            descripcion,
            precio,
            imagen,
            codigo,
            existencias,
            id: ProductManager.id
        };
        
        this.products.push(nuevoProducto)

        await fs.writeFile(this.patch, JSON.stringify(this.products));
    }

    leerProductos = async () => {
        let resultado = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(resultado)
    }


    obtenerProductos = async () => {
        let resultado2 = await this.leerProductos();
        return console.log(resultado2)
    }


    obtenerProductosPorId = async (id) => {
        let todosProductos = await this.leerProductos();
        const idProducto = todosProductos.find((productos) => productos.id === id);
        !idProducto ? console.log("No Existe el producto") : console.log(idProducto);
    }

    eliminarProductosPorId = async (id) => {
        let todosProductos = await this.leerProductos();
        let productoBuscado = todosProductos.filter((productos) => productos.id != id)
        await fs.writeFile(this.patch, JSON.stringify(productoBuscado), "utf8");
        console.log("Producto Eliminado");
        console.log(productoBuscado);
    }

    actualizarProducto = async ({ id, ...producto }) => {
        await this.eliminarProductosPorId(id);
        let produtOld = await this.leerProductos()
        let productoModificado = [{ ...producto, id }, ...produtOld];
        await fs.writeFile(this.patch, JSON.stringify(productoModificado), "utf8");
    }
}



const productos = new ProductManager


// ---------------------------------Test de Pruebas--------------------------------------------------- 

// Agregamos un producto para ver que si nos queda agregado en el array 

productos.agregarProducto("Elementos", "Pelicula Infantil muy animada", 10000, "imagen1", "1234ABC", 10);
productos.agregarProducto("sirenita", "Pelicula Infantil", 2000, "imagen2", "ABC123", 5);
productos.agregarProducto("Mohana", "Pelicula Infantil animada ", 5000, "imagen3", "ABC124", 7);

// Realizamos de nuevo la consulta de los productos que hay en el Array, nos debe mostrar los que agregamos

// productos.obtenerProductos();

// Buscamos el producto por id para saber si existe o no

// productos.obtenerProductosPorId(1);

// Realizamos la actualizacion de un producto

/*productos.actualizarProducto({
    titulo: 'Mohana',
    descripcion: 'Pelicula Infantil animada ',
    precio: 5000,
    imagen: 'imagen3',
    codigo: 'ABC124',
    existencias: 20,
    id: 3
});*/

// Realizamos la Eliminacion de un producto y consultamos de nuevo para ver los productos

// productos.eliminarProductosPorId(2);





