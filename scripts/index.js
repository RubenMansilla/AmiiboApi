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
    mostrarAmiibos(Indice); // Inicia la visualización de los primeros amiibos
};

// Muestra los siguientes amiibos y elimina el botón de carga si es necesario
function mostrarAmiibos(Indice) {
    // Calcula el límite de amiibos a mostrar (no supera el total de amiibos) 
    // Math.min devuelve el menor de los dos valores pasados como argumentos
    const limite = Math.min(Indice + amiibosAMostrar, res.amiibo.length);

    // Agrega cada amiibo al contenedor
    for (let i = Indice; i < limite; i++) {
        agregarTodosamiibo(res.amiibo[i]);
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
function agregarTodosamiibo(amiibo) {
    // Crea un nuevo elemento div para el amiibo
    const nuevoAmiibo = document.createElement('div');
    nuevoAmiibo.className = 'amiibo';

    // Obtén las dos primeras palabras del campo character
    const primerasDosPalabras = amiibo.character.split(' ').slice(0, 2).join(' ');

    // Actualiza el contenido HTML con las dos primeras palabras
    nuevoAmiibo.innerHTML = `
    <div class="cajaAmiiboImg">
        <img class="imgAmiibo" src="${amiibo.image}" alt="${amiibo.character}">
    </div>
    <div class="amiiboInfo">
        <h2 class="amiiboNombre">${primerasDosPalabras}</h2>
        <p class="amiiboSerie">${amiibo.amiiboSeries}</p>
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

function mostrarBotonCargar() {
    // Crea un div para contener el botón
    const divBotonCargar = document.createElement('div');

    // Crea el botón
    const botonCargar = document.createElement('button');

    // Texto del botón
    botonCargar.textContent = 'Ver más';

    // Estilos del botón
    botonCargar.classList.add('btnCargarMas', 'bn632-hover', 'bn22');

    // Agrega el evento para cargar más amiibos
    botonCargar.addEventListener('click', function () {
        Indice += amiibosAMostrar; // Incrementa el índice para cargar el siguiente lote
        mostrarAmiibos(Indice); // Muestra los siguientes amiibos
    });

    // Espera un breve período antes de aplicar la clase para permitir la animación
    setTimeout(() => {
        botonCargar.style.opacity = '1.5';
    }, 50);

    // Agrega el botón al div
    divBotonCargar.appendChild(botonCargar);

    divBotonCargar.classList.add('contenedorBotonCargar');

    // Agrega el div al contenedor de amiibos
    contenedorAmiibo.appendChild(divBotonCargar);
}


function capturarValor() {
    let inputNombre = document.getElementById('inputNombre').value;
    let inputSerie = document.getElementById('inputSerie').value;
    let inputTipo = document.getElementById('inputTipo').value;

    // Limpia el contenedor de amiibos antes de cada búsqueda
    contenedorAmiibo.innerHTML = '';

    // Llama a la función correspondiente según el botón presionado
    if (this.id === 'btnBuscarNombre') {
        /*
        if (inputNombre && inputSerie) {
            buscarPorNombreYSerie(inputNombre, inputSerie);
        } else {
        }*/
        buscarPorNombre(inputNombre);
    } else if (this.id === 'btnBuscarSelectSerie') {
        /*if (inputNombre && inputSerie) {
            buscarPorNombreYSerie(inputNombre, inputSerie);
        } else {
        }*/
        buscarPorSerie(inputSerie);
    } else if (this.id === 'btnBuscarSelectTipo') {
        buscarPorTipo(inputTipo);
    }
}

function buscarPorNombre(tipoSeleccionadoNombre) {
    const nombreBusqueda = tipoSeleccionadoNombre.toLowerCase(); // Convertir a minúsculas

    // Filtra los amiibos cuyo tipo coincide con el valor seleccionado en el input de búsqueda y los almacena en un nuevo array de amiibos encontrados
    const amiibosEncontrados = res.amiibo.filter(amiibo => amiibo.character.toLowerCase() === nombreBusqueda);

    contenedorAmiibo.innerHTML = '';

    // Si se encuentran amiibos, agrégalos al contenedor 
    if (amiibosEncontrados.length > 0) {
        // Agrega cada amiibo al contenedor de amiibos 
        amiibosEncontrados.forEach(amiibo => {
            agregarTodosamiibo(amiibo);
        });
        // Si no se encuentran amiibos, muestra un mensaje de error en el contenedor
    } else {
        const mensajeError = document.createElement('div');
        mensajeError.textContent = 'amiibos de este tipo no encontrados';
        contenedorAmiibo.appendChild(mensajeError);
    }
}

function buscarPorSerie(tipoSeleccionadoSerie) {

    // Filtra los amiibos cuyo tipo coincide con el valor seleccionado en el input de búsqueda y los almacena en un nuevo array de amiibos encontrados
    const amiibosEncontrados = res.amiibo.filter(amiibo => amiibo.amiiboSeries === tipoSeleccionadoSerie);

    contenedorAmiibo.innerHTML = '';

    // Si se encuentran amiibos, agrégalos al contenedor 
    if (amiibosEncontrados.length > 0) {
        // Agrega cada amiibo al contenedor de amiibos 
        amiibosEncontrados.forEach(amiibo => {
            agregarTodosamiibo(amiibo);
        });
        // Si no se encuentran amiibos, muestra un mensaje de error en el contenedor
    } else {
        const mensajeError = document.createElement('div');
        mensajeError.textContent = 'amiibos de este tipo no encontrados';
        contenedorAmiibo.appendChild(mensajeError);
    }

}

function buscarPorTipo(tipoSeleccionadoTipo) {

    // Filtra los amiibos cuyo tipo coincide con el valor seleccionado en el input de búsqueda y los almacena en un nuevo array de amiibos encontrados
    const amiibosEncontrados = res.amiibo.filter(amiibo => amiibo.type === tipoSeleccionadoTipo);

    contenedorAmiibo.innerHTML = '';

    // Si se encuentran amiibos, agrégalos al contenedor 
    if (amiibosEncontrados.length > 0) {
        // Agrega cada amiibo al contenedor de amiibos 
        amiibosEncontrados.forEach(amiibo => {
            agregarTodosamiibo(amiibo);
        });
        // Si no se encuentran amiibos, muestra un mensaje de error en el contenedor
    } else {
        const mensajeError = document.createElement('div');
        mensajeError.textContent = 'amiibos de este tipo no encontrados';
        contenedorAmiibo.appendChild(mensajeError);
    }
}


let btnBuscarNombre = document.getElementById('btnBuscarNombre');
let btnBuscarSelectSerie = document.getElementById('btnBuscarSelectSerie');
let btnBuscarSelectTipo = document.getElementById('btnBuscarSelectTipo');

btnBuscarNombre.addEventListener('click', capturarValor);
btnBuscarSelectSerie.addEventListener('click', capturarValor);
btnBuscarSelectTipo.addEventListener('click', capturarValor);



//Ventana de información del amiibo
function mostrarInformacion() {

}


/*

function amiiboNoEncontrado() {
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
        mostraramiibos();
    });
}

*/
