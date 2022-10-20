const fs = require('fs');


    }

    async create(){
        try {
            fs.promises.writeFile(`./${this.archivo}`,'[]')
            console.log("Se ha creado el archivo llamado: ", this.archivo, "\n ")
        } catch(err) {
            console.error(err)
        }
    }

   async save(productoAGuardar) {
        try {
            const listaProductos = await fs.promises.readFile(`${this.archivo}`,"utf-8")
            let listaParseada = JSON.parse(listaProductos)

            let ultimoId = 0;
            
            listaParseada.forEach(producto => {
                if(producto.id > ultimoId){
                    ultimoId = producto.id
                }
            });
            
            const nuevoId = ultimoId + 1
            productoAGuardar.id = nuevoId
            
            listaParseada.push(productoAGuardar)
            listaParseada = JSON.stringify(listaParseada)

            await fs.promises.writeFile(`${this.archivo}`, listaParseada)

            console.log("Lista guardada: ",listaParseada , "\n ")

        } catch(err) {
            console.error(err)
        }
    }

    async getAll(){
        try{
            return JSON.parse( await fs.promises.readFile(this.archivo,"utf-8") )

        } catch(err) {
            console.error(err)
        } 
    }

    async getById(id){
        try {
            const productos = JSON.parse( await fs.promises.readFile(this.archivo,"utf-8") )
            const producto =  productos.find(producto => producto.id == id)
            if(!producto) return "El id ingresado no tiene producto asociado \n"
            return producto
        } catch(err) {
            console.error(err)
        } 
    }

    async deleteById(id){
        try {
            const productos = JSON.parse( await fs.promises.readFile(this.archivo,"utf-8") )
            let nuevaLista = [];

            productos.forEach( producto => {
                if(producto.id !== id) {
                    nuevaLista.push(producto)
                }
            });
            nuevaLista = JSON.stringify(nuevaLista)
            await fs.promises.writeFile(`${this.archivo}`, nuevaLista)
            return `Se ha borrado el producto con id: ${id}, y la nueva lista es ${nuevaLista}`
        } catch(err) {
            console.error(err)
        } 
    }

    async deleteAll(){
        try {
            await fs.promises.writeFile(`${this.archivo}`, '[]')
            return "Se han borrado todos los productos"
        }catch(err){
            console.error(err)
        }
    }
}