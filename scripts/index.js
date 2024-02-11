
let res;
let contenedorAmiibo = document.getElementById('contenedorAmiibo');

const request = new XMLHttpRequest();
request.open('GET', 'https://www.amiiboapi.com/api/amiibo/');
request.responseType = 'json';
request.send();

request.onload = function () {
    res = request.response;
    console.log(res.amiibo);
    mostrarPersonajes();
};


function mostrarPersonajes() {
    const limite = Math.min(32, res.amiibo.length); // Tomar el mínimo entre 50 y la longitud total
    for (let i = 0; i < limite; i++) {
        agregarTodosPersonaje(res.amiibo[i]);
    }
}

function agregarTodosPersonaje(personaje) {
    contenedorAmiibo.innerHTML += `
        <div class="amiibo">
            <div class="cajaAmiiboImg">
                <img class="imgAmiibo" src="${personaje.image}" alt="${personaje.character}">
            </div>
            <div class="amiiboInfo">
                <h2 class="amiiboNombre">${personaje.character}</h2>
                <p class="amiiboSerie">${personaje.amiiboSeries}</p>
                <a><button id="btnMasInformacion" class="bn632-hover bn22">Mas Información</button></a>
            </div>
        </div>
        `;
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