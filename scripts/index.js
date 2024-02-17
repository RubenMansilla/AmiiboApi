// Declaración de variables
let res; // Almacena la respuesta de la solicitud a la API
let res2; // Almacena la respuesta de la solicitud a la API
let contenedorAmiibo = document.getElementById('contenedorAmiibo'); // Referencia al contenedor de amiibos en el DOM
let Indice = 0; // Índice inicial para mostrar los primeros 34 amiibos
const amiibosAMostrar = 32; // Tamaño del lote de amiibos a mostrar

// Crear una solicitud XMLHttpRequest para obtener datos de la API
const request = new XMLHttpRequest();
const request2 = new XMLHttpRequest();

// Inicializa la solicitud con el método y la URL de la API de amiibos
request.open('GET', 'https://www.amiiboapi.com/api/amiibo/');
request2.open('GET', 'https://www.amiiboapi.com/api/amiibo/?showusage/');

// Establece el tipo de respuesta que se espera de la solicitud
request.responseType = 'json';
request2.responseType = 'json';

// Envía la solicitud a la API
request.send();
request2.send();

// Evento que se ejecuta cuando la solicitud se ha completado satisfactoriamente
request.onload = function () {
    res = request.response; // Asigna la respuesta de la solicitud a la variable res
    mostrarAmiibos(Indice); // Inicia la visualización de los primeros amiibos
};

// Evento que se ejecuta cuando la solicitud se ha completado satisfactoriamente
request2.onload = function () {
    res2 = request2.response; // Asigna la respuesta de la solicitud a la variable res
};

function eliminarAnimacionDespues1_4s() {
    setTimeout(() => {
        let amiiboElements = document.querySelectorAll('.amiibo');
        amiiboElements.forEach(element => {
            element.style.animation = 'none';
            element.style.webkitAnimation = 'none';
        });
    }, 1400);
}

// Muestra los siguientes amiibos y elimina el botón de carga si es necesario
function mostrarAmiibos(Indice) {
    // Calcula el límite de amiibos a mostrar (no supera el total de amiibos) 
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

    // Obtén las dos primeras palabras del campo character del amiibo
    const primerasDosPalabras = amiibo.character.split(' ').slice(0, 2).join(' ');

    // Actualiza el contenido HTML con las dos primeras palabras
    nuevoAmiibo.innerHTML = `
        <div class="cajaAmiiboImg">
            <img class="imgAmiibo" src="${amiibo.image}" alt="Foto de ${amiibo.character}">
        </div>
        <div class="amiiboInfo">
            <h2 class="amiiboNombre">${primerasDosPalabras}</h2>
            <p class="amiiboSerie">${amiibo.amiiboSeries}</p>
            <a><button class="btnMasInformacion bn632-hover bn22">Mas Información</button></a>
        </div>
    `;

    // Asigna el evento de clic al botón de información
    const btnMasInformacion = nuevoAmiibo.querySelector('.btnMasInformacion');
    btnMasInformacion.addEventListener('click', function () {
        mostrarInformacion(amiibo);
    });

    // Agrega el nuevo amiibo al contenedor
    contenedorAmiibo.appendChild(nuevoAmiibo);

    // Espera un breve período antes de aplicar la clase para permitir la animación
    setTimeout(() => {
        nuevoAmiibo.style.opacity = '1';
    }, 50);

    eliminarAnimacionDespues1_4s();
}

function mostrarBotonCargar() {
    // Crea un div para contener el botón
    const divBotonCargar = document.createElement('div');

    // Crea el botón
    const botonCargar = document.createElement('button');

    // Texto del botón
    botonCargar.textContent = 'Ver más';

    // Estilos del botón
    botonCargar.classList.add('btnCargarMas', 'btnMasInformacion');

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

// Realiza la búsqueda de amiibos según el tipo y valor de búsqueda
function buscarAmiibo() {
    // Obtiene los valores de los inputs y los normaliza
    let inputNombre = document.getElementById('inputNombre').value.trim().toLowerCase();
    let inputSerie = document.getElementById('inputSerie').value;
    let inputTipo = document.getElementById('inputTipo').value;

    // Limpia el contenedor de amiibos antes de cada búsqueda
    contenedorAmiibo.innerHTML = '';

    // Realiza la búsqueda combinada solo si al menos un input tiene valor distinto de vacío o el valor por defecto
    if (inputNombre !== '' || inputSerie !== 'Serie de amiibo' || inputTipo !== 'Tipo de Amiibo') {

        // Filtra la lista de amiibos según los valores de los inputs no vacíos
        let amiibosEncontrados = res.amiibo.filter(function (amiibo) {
            // Comprueba si el nombre del amiibo contiene la cadena de búsqueda (ignorando mayúsculas y minúsculas) 
            // o si no se ha ingresado un nombre
            const nombreCoincide = !inputNombre || amiibo.character.toLowerCase().includes(inputNombre);

            // Comprueba si la serie del amiibo coincide con el valor seleccionado o si no se ha seleccionado una serie
            const serieCoincide = inputSerie === 'Serie de amiibo' || amiibo.amiiboSeries === inputSerie;

            // Comprueba si el tipo del amiibo coincide con el valor seleccionado o si no se ha seleccionado un tipo
            const tipoCoincide = inputTipo === 'Tipo de Amiibo' || amiibo.type === inputTipo;

            // Retorna true solo si todos los criterios coinciden
            return nombreCoincide && serieCoincide && tipoCoincide;
        });

        // Si se encuentran amiibos, agrégalos al contenedor
        if (amiibosEncontrados.length > 0) {
            for (let i = 0; i < amiibosEncontrados.length; i++) {
                agregarTodosamiibo(amiibosEncontrados[i]);
            }
        } else {
            // Si no se encuentran amiibos, muestra un mensaje de no encontrado
            amiiboNoEncontrado();
        }
    } else {
        // Si no se ingresa ningún valor, muestra todos los amiibos
        mostrarAmiibos(Indice);
    }
}

// Referencias a los botones de búsqueda 
let btnBuscarNombre = document.getElementById('btnBuscarNombre');
let btnBuscarSelectSerie = document.getElementById('btnBuscarSelectSerie');
let btnBuscarSelectTipo = document.getElementById('btnBuscarSelectTipo');

btnBuscarNombre.addEventListener('click', buscarAmiibo);
btnBuscarSelectSerie.addEventListener('click', buscarAmiibo);
btnBuscarSelectTipo.addEventListener('click', buscarAmiibo);

// Ventana de información del amiibo
function mostrarInformacion(amiibo) {
    // Lógica para mostrar información del amiibo, puedes implementar esto según tus necesidades
    console.log('Mostrar información de:', amiibo);
}

function amiiboNoEncontrado() {
    // Configura la transición de opacidad en 2 segundos
    const alertaHTML = `
        <div class="alerta" style="opacity: 0; transition: opacity 2s ease-in-out;">
            <div class="iconoAlerta">
                <img src="img/icon.png">
            </div>
            <div class="textoAlerta">
                <p>El personaje que buscas no existe, inténtalo de nuevo</p>
            </div>
        </div>
        <div class="cajaBtnAtras" style="opacity: 0; transition: opacity 2s ease-in-out;">
            <button class="btnMasInformacion" id="botonAlerta">Volver</button>
        </div>
    `;

    // Retrasa la ejecución de la función amiiboNoEncontrado en 2 segundos
    setTimeout(function () {
        contenedorAmiibo.innerHTML = alertaHTML;

        // Aplica la opacidad después de un breve período para activar la transición
        setTimeout(() => {
            const alerta = document.querySelector('.alerta');
            const cajaBtnAtras = document.querySelector('.cajaBtnAtras');
            alerta.style.opacity = '1';
            cajaBtnAtras.style.opacity = '1';
        }, 50);

        agregarEventoVolver(Indice);
    }, 500); // 500 milisegundos (0.5 segundos)
}

function agregarEventoVolver(indice) {
    let botonAlerta = document.getElementById('botonAlerta');
    botonAlerta.addEventListener('click', function () {
        contenedorAmiibo.innerHTML = ``;
        indice = 0;
        mostrarAmiibos(indice);
    });
}

let logo = document.getElementById('logo');
logo.addEventListener('click', function () {
    contenedorAmiibo.innerHTML = ``;
    indice = 0;
    mostrarAmiibos(indice);
});
