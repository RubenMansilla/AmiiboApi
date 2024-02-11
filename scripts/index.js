// Declaración de variables
let res; // Almacena la respuesta de la solicitud a la API
let contenedorAmiibo = document.getElementById('contenedorAmiibo'); // Referencia al contenedor de amiibos en el DOM
let Indice = 0; // Índice inicial para mostrar los primeros 34 amiibos
const amiibosAMostrar = 32; // Tamaño del lote de amiibos a mostrar

// Crear una solicitud XMLHttpRequest para obtener datos de la API
const request = new XMLHttpRequest();
request.open('GET', 'https://www.amiiboapi.com/api/amiibo/');
request.responseType = 'json';
request.send();

// Evento que se ejecuta cuando la solicitud se ha completado satisfactoriamente
request.onload = function () {
    res = request.response; // Asigna la respuesta de la solicitud a la variable res
    mostrarPersonajes(Indice); // Inicia la visualización de los primeros amiibos
};

// Muestra los siguientes amiibos y elimina el botón de carga si es necesario
function mostrarPersonajes(Indice) {
    // Calcula el límite de amiibos a mostrar (no supera el total de amiibos) 
    const limite = Math.min(Indice + amiibosAMostrar, res.amiibo.length); 

    // Agrega cada amiibo al contenedor
    for (let i = Indice; i < limite; i++) {
        agregarTodosPersonaje(res.amiibo[i]);
    }

    // Elimina solo los botones de carga existentes
    eliminarBotonesCarga();

    // Si hay más amiibos por cargar, muestra el botón
    if (limite < res.amiibo.length) {
        mostrarBotonCargar();
    }
}

// Elimina solo los botones de carga del contenedor
function eliminarBotonesCarga() {
    const botonesCarga = document.querySelectorAll('.btnCargarMas');
    botonesCarga.forEach(boton => {
        boton.parentNode.removeChild(boton);
    });
}

// Agrega un amiibo al contenedor de amiibos
function agregarTodosPersonaje(personaje) {
    // Crea un nuevo elemento div para el amiibo
    const nuevoAmiibo = document.createElement('div');
    nuevoAmiibo.className = 'amiibo';

    // Construye el contenido del nuevo amiibo
    nuevoAmiibo.innerHTML = `
        <div class="cajaAmiiboImg">
            <img class="imgAmiibo" src="${personaje.image}" alt="${personaje.character}">
        </div>
        <div class="amiiboInfo">
            <h2 class="amiiboNombre">${personaje.character}</h2>
            <p class="amiiboSerie">${personaje.amiiboSeries}</p>
            <a><button class="btnMasInformacion bn632-hover bn22">Mas Información</button></a>
        </div>
    `;

    // Agrega el nuevo amiibo al contenedor
    contenedorAmiibo.appendChild(nuevoAmiibo);

    // Espera un breve período antes de aplicar la clase para permitir la animación
    setTimeout(() => {
        nuevoAmiibo.style.opacity = '1';
    }, 50);
}

// Muestra el botón para cargar más amiibos
function mostrarBotonCargar() {
    // Crea el botón
    const botonCargar = document.createElement('button');

    // Texto del botón
    botonCargar.textContent = 'Ver más';

    // Estilos del botón
    botonCargar.classList.add('btnCargarMas', 'bn632-hover', 'bn22');

    // Agrega el evento para cargar más amiibos
    botonCargar.addEventListener('click', function () {
        Indice += amiibosAMostrar; // Incrementa el índice para cargar el siguiente lote
        mostrarPersonajes(Indice); // Muestra los siguientes amiibos
    });

    // Espera un breve período antes de aplicar la clase para permitir la animación
    setTimeout(() => {
        botonCargar.style.opacity = '1';
    }, 50);

    // Agrega el botón al contenedor de amiibos
    contenedorAmiibo.appendChild(botonCargar);
}



/*

function capturarValor() {
    let valorInput = inputNombre.value;
    inputNombre.value = "";
    mostrarPersonajes(valorInput);
}


function personajeNoEncontrado() {
    contenedorAmiibo.style.removeProperty("flex-wrap");
    contenedorAmiibo.style.flexDirection = "column";
    contenedorAmiibo.innerHTML = `
        
    `;
    agregarEventoVolver();
}

function agregarEventoVolver() {
    let botonAlerta = document.getElementById('botonAlerta');
    botonAlerta.addEventListener('click', function () {
        contenedorAmiibo.style.flex = "wrap";
        contenedorAmiibo.style.flexDirection = "";
        mostrarPersonajes();
    });
}

*/