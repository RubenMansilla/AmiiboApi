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

    // Obtén las dos primeras palabras del campo character
    const primerasDosPalabras = personaje.character.split(' ').slice(0, 2).join(' ');

    // Actualiza el contenido HTML con las dos primeras palabras
    nuevoAmiibo.innerHTML = `
    <div class="cajaAmiiboImg">
        <img class="imgAmiibo" src="${personaje.image}" alt="${personaje.character}">
    </div>
    <div class="amiiboInfo">
        <h2 class="amiiboNombre">${primerasDosPalabras}</h2>
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

//Ventana de información del amiibo
function mostrarInformacion(){
    
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
        botonCargar.style.opacity = '1.5';
    }, 50);

    // Agrega el botón al contenedor de amiibos
    contenedorAmiibo.appendChild(botonCargar);
}


function mostrarPersonajeEspecifico(inputNombre) {
    // Convierte el valor del input a minúsculas para hacer la comparación sin importar mayúsculas/minúsculas
    const nombreBusqueda = inputNombre.toLowerCase();

    // Filtra los personajes cuyo nombre contiene el valor ingresado en el input de búsqueda y los almacena en un nuevo array de personajes encontrados 
    const personajesEncontrados = res.amiibo.filter(personaje => personaje.character.toLowerCase().includes(nombreBusqueda));

    // Limpia el contenedor de amiibos
    contenedorAmiibo.innerHTML = '';

    // Si se encuentran personajes, agrégalos al contenedor
    if (personajesEncontrados.length > 0) {
        personajesEncontrados.forEach(personaje => {
            agregarTodosPersonaje(personaje);
        });
    } else {
        // Si no se encuentran personajes, muestra un mensaje de error en el contenedor
        const mensajeError = document.createElement('div');
        mensajeError.textContent = 'Personajes no encontrados';
        contenedorAmiibo.appendChild(mensajeError);
    }
}

function capturarValor() {
    let inputNombre = document.getElementById('inputNombre').value;
    let inputSerie = document.getElementById('inputSerie').value;
    let inputTipo = document.getElementById('inputTipo').value;
    console.log(inputTipo)

    // Limpia el contenedor de amiibos antes de cada búsqueda
    contenedorAmiibo.innerHTML = '';

    if (inputNombre) {
        mostrarPersonajeEspecifico(inputNombre);
    } else if (inputSerie) {
        mostrarSerieEspecifica(inputSerie);
    } else if (inputTipo) {
        mostrarTipoEspecifico(inputTipo);
    } else {
        
    }
}

function mostrarSerieEspecifica(serieSeleccionada) {

    // Filtra los personajes cuya serie coincide con el valor seleccionado en el input de búsqueda y los almacena en un nuevo array de personajes encontrados
    const personajesEncontrados = res.amiibo.filter(personaje => personaje.amiiboSeries === serieSeleccionada);

    // Limpia el contenedor de amiibos
    contenedorAmiibo.innerHTML = '';

    if (personajesEncontrados.length > 0) {
        personajesEncontrados.forEach(personaje => {
            agregarTodosPersonaje(personaje);
        });
    } else {
        const mensajeError = document.createElement('div');
        mensajeError.textContent = 'Personajes de esta serie no encontrados';
        contenedorAmiibo.appendChild(mensajeError);
    }
}

function mostrarTipoEspecifico(tipoSeleccionado) {

    // Filtra los personajes cuyo tipo coincide con el valor seleccionado en el input de búsqueda y los almacena en un nuevo array de personajes encontrados
    const personajesEncontrados = res.amiibo.filter(personaje => personaje.type === tipoSeleccionado);

    contenedorAmiibo.innerHTML = '';

    // Si se encuentran personajes, agrégalos al contenedor 
    if (personajesEncontrados.length > 0) {
        // Agrega cada personaje al contenedor de amiibos 
        personajesEncontrados.forEach(personaje => { 
            agregarTodosPersonaje(personaje);
        });
    // Si no se encuentran personajes, muestra un mensaje de error en el contenedor
    } else {
        const mensajeError = document.createElement('div');
        mensajeError.textContent = 'Personajes de este tipo no encontrados';
        contenedorAmiibo.appendChild(mensajeError);
    }
}


let btnBuscarNombre = document.getElementById('btnBuscarNombre');
let btnBuscarSelectSerie = document.getElementById('btnBuscarSelectSerie');
let btnBuscarSelectTipo = document.getElementById('btnBuscarSelectTipo');

btnBuscarNombre.addEventListener('click', capturarValor);
btnBuscarSelectSerie.addEventListener('click', capturarValor);
btnBuscarSelectTipo.addEventListener('click', capturarValor);



/*

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
