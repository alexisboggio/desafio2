const Container = require("./clase")

async function test() {
    const contenedor = new Container("./productos.txt")
    await contenedor.create()
    
    const productoAGuardar1 = {
        title: "Levite de manzana",
        price: 180,
        thumbnail: "https://images.app.goo.gl/aY1PpBeCqvfcHUti9" 
    }
    const productoAGuardar2 = {
        title: "Cindor",
        price: 200,
        thumbnail: "" 
    }
    try {
        await contenedor.save(productoAGuardar1)
        await contenedor.save(productoAGuardar2)
    } catch(err) {
        console.error(err)
    }

    try {
        const lista = await contenedor.getAll()
        console.log("El GetAll devuelve: ", lista, "\n ")
    } catch(err) {
        console.error(err)
    }

    try {
        const producto = await contenedor.getById(1)
        console.log("El GetById devuelve: ", producto, "\n ")
    } catch(err) {
        console.error(err)
    }

       try {
        const retorno = await contenedor.deleteById(1)
        console.log("El DeleteById devuelve: ", retorno, "\n ")
    } catch(err) {
        console.error(err)
    }

    try {
        const retorno = await contenedor.deleteAll()
        console.log(retorno, "\n ")
    } catch(err) {
        console.error(err)
    }
}

test()