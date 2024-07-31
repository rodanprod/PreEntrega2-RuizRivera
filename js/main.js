// Funciones de búsqueda y filtrado
function buscarComponentePorNombre(nombreComponente) {
    const keywords = {
        "gabinete": "Gabinete",
        "case": "Gabinete",
        "placa madre": "Placa Madre",
        "motherboard": "Placa Madre",
        "placa": "Placa Madre",
        "procesador": "Procesador",
        "cpu": "Procesador",
        "tarjeta grafica": "Tarjeta Gráfica",
        "gpu": "Tarjeta Gráfica",
        "fuente de poder": "Fuente de Poder",
        "psu": "Fuente de Poder",
        "ram": "RAM",
        "memoria": "RAM",
        "refrigeracion": "Refrigeración",
        "cooler": "Refrigeración",
        "disco solido": "Disco Sólido",
        "ssd": "Disco Sólido",
        "disco": "Disco Sólido"
    };
    
    const componenteReal = keywords[nombreComponente.toLowerCase()];
    return componentes.find(componente => componente.nombre === componenteReal);
}

function filtrarComponentesPorPrecio(maxPrecio) {
    let componentesFiltrados = [];
    for (let componente of componentes) {
        let opcionesFiltradas = componente.opciones.filter(opcion => opcion.precio <= maxPrecio);
        if (opcionesFiltradas.length > 0) {
            componentesFiltrados.push({
                nombre: componente.nombre,
                opciones: opcionesFiltradas
            });
        }
    }
    return componentesFiltrados;
}

// Componentes y precios
let componentes = [
    {
        nombre: "Gabinete",
        opciones: [
            { nombre: "ASUS ROG Hyperion", precio: 250000 },
            { nombre: "ASUS ROG Strix Case", precio: 200000 },
            { nombre: "ASUS TUF Gaming Case", precio: 150000 }
        ]
    },
    {
        nombre: "Placa Madre",
        opciones: [
            { nombre: "ASUS ROG Maximus XIII", precio: 350000 },
            { nombre: "ASUS ROG Strix Z590-E", precio: 300000 },
            { nombre: "ASUS TUF Gaming B560M", precio: 200000 }
        ]
    },
    {
        nombre: "Procesador",
        opciones: [
            { nombre: "AMD Ryzen 9 5900X", precio: 400000 },
            { nombre: "AMD Ryzen 7 5800X", precio: 350000 },
            { nombre: "AMD Ryzen 5 5600X", precio: 300000 }
        ]
    },
    {
        nombre: "Tarjeta Gráfica",
        opciones: [
            { nombre: "ASUS ROG Strix RTX 3080", precio: 800000 },
            { nombre: "ASUS TUF Gaming RTX 3070", precio: 700000 },
            { nombre: "ASUS Dual RTX 3060", precio: 600000 }
        ]
    },
    {
        nombre: "Fuente de Poder",
        opciones: [
            { nombre: "ASUS ROG Thor 850W", precio: 150000 },
            { nombre: "ASUS ROG Strix 750W", precio: 130000 },
            { nombre: "ASUS TUF Gaming 650W", precio: 100000 }
        ]
    },
    {
        nombre: "RAM",
        opciones: [
            { nombre: "Corsair Vengeance RGB Pro 32GB", precio: 200000 },
            { nombre: "G.Skill Trident Z RGB 16GB", precio: 150000 },
            { nombre: "Kingston HyperX Fury 16GB", precio: 120000 }
        ]
    },
    {
        nombre: "Refrigeración",
        opciones: [
            { nombre: "Cooler Master Liquid ML360R", precio: 150000 },
            { nombre: "Corsair H100i RGB", precio: 130000 },
            { nombre: "NZXT Kraken X53", precio: 120000 }
        ]
    },
    {
        nombre: "Disco Sólido",
        opciones: [
            { nombre: "Samsung 970 EVO Plus 1TB", precio: 200000 },
            { nombre: "WD Black SN750 1TB", precio: 180000 },
            { nombre: "Kingston A2000 1TB", precio: 150000 }
        ]
    }
];

let carrito = [];
let total = 0;

alert("Bienvenido al Cybermart de RODAN_TECH, donde tú eres el PROPLAYER. Vamos a armar tu PRÓXIMO PC GAMER.");

function seleccionarComponente(componente) {
    let opciones = componente.opciones;
    let mensaje = `Selecciona una opción para ${componente.nombre}:\n`;
    for (let i = 0; i < opciones.length; i++) {
        mensaje += `${i + 1}: ${opciones[i].nombre} - ${opciones[i].precio} CLP\n`;
    }
    mensaje += "4: Saltar producto";
    let seleccion = parseInt(prompt(mensaje));
    while (isNaN(seleccion) || seleccion < 1 || seleccion > 4) {
        alert("Por favor selecciona una opción válida.");
        seleccion = parseInt(prompt(mensaje));
    }
    return seleccion === 4 ? null : opciones[seleccion - 1];
}

function armarPC() {
    for (let i = 0; i < componentes.length; i++) {
        let componente = componentes[i];
        let seleccion = seleccionarComponente(componente);
        if (seleccion) {
            carrito.push(seleccion);
            total += seleccion.precio;
        }
    }
    mostrarCarrito();
}

function buscarProducto() {
    let nombreComponente = prompt("Ingresa el nombre del componente que deseas buscar:");
    let resultadoBusqueda = buscarComponentePorNombre(nombreComponente);
    if (resultadoBusqueda) {
        let opciones = resultadoBusqueda.opciones;
        let mensaje = `Opciones para ${resultadoBusqueda.nombre}:\n`;
        for (let i = 0; i < opciones.length; i++) {
            mensaje += `${i + 1}: ${opciones[i].nombre} - ${opciones[i].precio} CLP\n`;
        }
        let seleccion = parseInt(prompt(mensaje));
        while (isNaN(seleccion) || seleccion < 1 || seleccion > opciones.length) {
            alert("Por favor selecciona una opción válida.");
            seleccion = parseInt(prompt(mensaje));
        }
        let seleccionado = opciones[seleccion - 1];
        carrito.push(seleccionado);
        total += seleccionado.precio;
        alert(`${seleccionado.nombre} ha sido agregado al carrito.`);
    } else {
        alert("Componente no encontrado.");
    }
}

function mostrarCarrito() {
    let mensajeCarrito = "Tu carrito:\n";
    for (let item of carrito) {
        mensajeCarrito += `${item.nombre} - ${item.precio} CLP\n`;
    }
    mensajeCarrito += `Total: ${total} CLP`;
    alert(mensajeCarrito);
}

function pagar() {
    let nombre = prompt("Ingresa tu nombre:");
    let correo = prompt("Ingresa tu correo:");

    let metodoPago = prompt("¿Cómo deseas pagar? (1: Crédito/Débito, 2: Transferencia)");
    while (metodoPago !== "1" && metodoPago !== "2") {
        alert("Método de pago no válido. Por favor, intenta nuevamente.");
        metodoPago = prompt("¿Cómo deseas pagar? (1: Crédito/Débito, 2: Transferencia)");
    }

    switch (metodoPago) {
        case "1":
            alert("Has seleccionado pagar con Crédito/Débito.");
            break;
        case "2":
            alert("Has seleccionado pagar con Transferencia.");
            break;
    }

    alert("Por favor, ingresa los números de tu tarjeta para proceder con el pago.");
    alert("¡Ahh! ¡Te la creíste! Jajaja.");

    if (nombre.toLowerCase() === "lucas") {
        alert("Gracias por comprar en Cybermart. ¡Vuelve pronto, joven Padawan Lucas!");
    } else {
        alert(`Gracias por comprar en Cybermart. ¡Vuelve pronto, joven Padawan ${nombre}!`);
    }
}

// Menú principal
while (true) {
    let opcion = prompt("¿Qué deseas hacer?\n1: Armar PC\n2: Buscar un producto específico\n3: Ver carrito\n4: Ir a pagar\n5: Salir (Cierra el simulador)");
    if (opcion === "1") {
        armarPC();
    } else if (opcion === "2") {
        buscarProducto();
    } else if (opcion === "3") {
        mostrarCarrito();
    } else if (opcion === "4") {
        pagar();
    } else if (opcion === "5") {
        alert("Cerrando el simulador. ¡Gracias por visitarnos!");
        break;
    } else {
        alert("Por favor selecciona una opción válida.");
    }
}
