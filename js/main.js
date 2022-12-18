//inicio
alert("Bienvenido a la tienda de modelos 3d");

//Creación de array de categorías
const categoria = ["animacion", "marvel", "anime", "videojuegos"];



//Creación de array de objetos
const modelos = [
    {id:1, nombre: "Homero", categoria:"animacion", serie:"Los Simpsons", precio: 4, formato: ".stl"},
    {id:2, nombre: "Hulk", categoria:"marvel", serie:"Hulk", precio: 0, formato: ".stl"},
    {id:3, nombre: "Goku", categoria:"anime", serie:"DBZ", precio: 25, formato: ".stl"},
    {id:4, nombre: "Picollo", categoria:"anime", serie:"DBZ", precio: 39, formato: ".stl"},
    {id:5, nombre: "Ryu", categoria:"videojuegos", serie:"Street Fighter", precio: 9, formato: ".stl"},
    {id:6, nombre: "Wheatley", categoria:"videojuegos", serie:"Portal2", precio: 20, formato: ".stl"}
    ];

    const modelos_agregados = [];

class Modelo {
    constructor(id, nombre, categoria, serie, precio, formato) {
        this.id= id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.serie = serie;
        this.precio = precio;
        this.formato =formato;
    }

    cambiarFormato(){
        this.formato = ".obj";
    }
}


//Funciones
function filtrarModeloCategoria(categorias) {
    return (modelos.filter(item => item.categoria == categorias) || null);
    
    
}

function buscarModeloID(id) {
    return (modelo.find(item => item.id === id) || null);
}

function agregarModelo(modeloElegido) {
    modelos_agregados.push(modeloElegido);
}

function recorrerArray(arrayElegido) {
    let contenido = "";

    if(arrayElegido == categoria) {
        for (let categor of arrayElegido) {
        contenido += categoria + "\n";
        }
    }
    else if (arrayElegido == modelo) {
        for (let model of arrayElegido) {
            contenido += model.id + "- " + model.nombre + " -" + model.categoria + " -" + model.serie + " -"+ model.precio + " -" + model.formato + "\n";
        }
    }
    else if (arrayElegido == modelos_agregados){
        for (let model of modelos_agregados) {
        contenido += model.id + "- " + model.nombre + " -" + model.categoria + " -" + model.serie + " -"+ model.precio + " -" + model.formato + "\n";
        }
            
    }

    return contenido;
}

function eliminarModelo(id) {
    let pos = modelos_agregados.findIndex(item => item.id === id);

    if (pos > -1) {
        modelos_agregados.splice(pos, 1);
    }
}

function restar(valor) {
    let valorTotal= valor - restaDescuento;
    if(valorTotal<= 0){
        return 0;
    }
    else {
        return valorTotal;
    }
}

//

//Variable para continuar o no en categorias
cargarCategorias = true;


//Array donde se almacenan los modelos filtrados por las categorías
const modelo= [];

let categoria_modelo = "";

//Categorias
while (cargarCategorias) {
    while(categoria_modelo !="anime" && categoria_modelo !="marvel" && categoria_modelo !="videojuegos" && categoria_modelo!="animacion") {
    let contenido_modelos = recorrerArray(categoria);
    categoria_modelo = prompt("Indique el nombre de la categoría para buscar un modelo 3d:\n\n" + " Categorías disponibles: " + categoria + "\n");
    
}
    let modeloCategoria;
    modeloCategoria = filtrarModeloCategoria(categoria_modelo);

    for (let model of modeloCategoria) {
        modelo.push(model);
    }

    cargarModelo = true;

    let continuarAgregando = true;

    //Modelos Filtrados
    while (cargarModelo) {
        let contenido_modelos = recorrerArray(modelo);

        let id_modelo = parseInt(prompt("Seleccione el Producto a agregar al Carrito mediante el número:\n\n" + contenido_modelos))
        let eleccion = buscarModeloID(id_modelo);

        if (eleccion != null) {
             agregarModelo(eleccion);
         } else {
             alert("No existe el modelo con el ID indicado");
        }

        let contenido_modelo = recorrerArray(modelos_agregados);

         continuarAgregando = confirm("Desea agregar otro modelo?" + "\n" + "Modelos agregados: " + "\n\n" +contenido_modelo);
        
        
         if(continuarAgregando == true) {
            categoria_modelo = "";
            cargarModelo = false;
            cargarCategorias = true;
         }
         else {
            cargarModelo = false;
            cargarCategorias = false;
         }
         modelo.splice(0, modelo.length)
    }
}

cargarModelo = confirm("Desea eliminar algún modelo del Carrito?");

while (cargarModelo) {
    let contenido_modelo = recorrerArray(modelos_agregados);

    let id_modelo = parseInt(prompt("Seleccione el Producto que desee eliminar del Carrito: (0 - Salir)\n\n" + contenido_modelo));

    if (id_modelo > 0) {
        eliminarModelo(id_modelo);
    } else {
        alert("No existe el modelo con el ID indicado");
    }

    cargarModelo = confirm("Desea eliminar otro Producto del Carrito?");
}

//Uso de cupones de descuento
let cupon = confirm ("Tienes un cupón de descuento?");
let restaDescuento = 0;
while(cupon == true) {
    let descuento= prompt("Indique el codigo del cupón: (Codigo de prueba: Z4T58)");
    if(descuento == "Z4T58") {
        restaDescuento = 10;
        cupon = false;
    }
    else {
        alert("El cupón ingresado es inválido");
        cupon = confirm ("Intentar nuevamente?");
    }
    
} 

//Cambio de formato
let solicitarFormato = confirm("Desea convertir los modelos a formato .obj?");

//Calculo final para indicar el total gastado
let total = 0;
let contenido_modelos = "";

for (let model of modelos_agregados) {
    let modeloTotal = new Modelo(model.id, model.nombre, model.categoria, model.serie, model.precio, model.formato);
    
    if (solicitarFormato == true) {
        modeloTotal.cambiarFormato();
    }
    contenido_modelos += modeloTotal.id + "- " + modeloTotal.nombre + modeloTotal.formato +  " $" + modeloTotal.precio +"\n";
  
   
    total += model.precio;
}







//Total - cupon
total = restar(total);

//Total a pagar
alert("Productos Seleccionados:\n\n" + contenido_modelos + "\n\n" + "Descuento aplicado= " + restaDescuento + "\n\nTotal a Pagar: $" + total);