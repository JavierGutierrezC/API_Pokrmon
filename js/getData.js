//obtener la API por medio de promesas
/** 
* fetch() esto es nuevo en JS 
* permite controlar errores mas facilmente
* trabaja por medio de protocolo http o https y se basa en promesas
* sistema de peticiones y respuestas
*/

//URL de la API
const API = "https://pokeapi.co/api/v2/pokemon?limit=30&offset=00";

//Obtener el retorno de la API
function getData(data){
    return fetch(data) //trae info de la api
    .then((response) => response.json()) //traer contenido en formato json
    .then((pepe)=>{
        llenarDatos(pepe), 
        paginacion(pepe);
       // console.log("pepe", pepe)
        })
        .catch((error)=>{
            console.log("Error: ", error);
        });
}

// Lenar datos en nuestra pagina
// data es el json que viene del getData
function llenarDatos(data) {
    let html = "";
    data.results.forEach((pj) => {
        const pokeURL = pj.url;
        return fetch(pokeURL)
            .then((response) => response.json())
            .then((json) => {
                if (json != "") {
                    html += '<div class="col mt-5">';
                    html += '<div class="card" style="width: 10rem;">';
                    html += `<img src="${json.sprites.other.dream_world.front_default}" class="card-img-top" alt="...">`;
                    html += '<div class="card-body">';
                    html += `<h5 class = "card-title" >${pj.name}</h5>`;
                    html += `<p class="card-text">Altura :${json.height}</p>`;
                    html += `<p class="card-text">Peso :${json.weight}</p>`;
                    html += "</div>";
                    html += "</div>";
                    html += "</div>";
                }
                document.getElementById("datosPersonajes").innerHTML = html;
            })
            .catch((error) => {
                console.log("Error :", error);
            });
    });
}

// function llenarDatos(data) {
//     //let html = "";
//     data.results.forEach((pj) => {
//         const pokeURL = pj.url;
//         return fetch(pokeURL)
//             .then((response) => response.json())
//             .then((json) => {
//                 crearother(json);        
//             })
//             .catch((error) => {
//                 console.log("Error :", error);
//             });
//     });
// }
// let html = "";
// function crearother(json){
//     // let html = "";
//     console.log("entre", json)
// if (json != "") {
//     html += '<div class="col mt-5">';
//     html += '<div class="card" style="width: 10rem;">';
//     html += `<img src="${json.sprites.other.dream_world.front_default}" class="card-img-top" alt="...">`;
//     html += '<div class="card-body">';
//     html += `<h5 class = "card-title" >${pj.name}</h5>`;
//     html += `<p class="card-text">Altura :${json.height}</p>`;
//     html += `<p class="card-text">Peso :${json.weight}</p>`;
//     html += "</div>";
//     html += "</div>";
//     html += "</div>";
//     }
//     document.getElementById("datosPersonajes").innerHTML = html;
// }


function paginacion(info) {
    let prevDisabled = "";
    let nextDisabled = "";

    // if (info.previous == null) {
    //     prevDisabled = "disabled";
    // } else {
    //     prevDisabled = "";
    // }

    // if (info.next == null) {
    //     nextDisabled = "disabled";
    // } else {
    //     nextDisabled = "";
    // }

    // let html = "";
    // html += `<li class="page-item ${prevDisabled}"><a class="page-link" onclick="getData('${info.previous}')">Previous</a></li>`;
    // html += `<li class="page-item ${nextDisabled}"><a class="page-link" onclick="getData('${info.next}')">Next</a></li>`;
    // document.getElementById("paginacion").innerHTML = html;

    // CON TERNARIA
    let html = "";
    (info.previous == null) ? (prevDisabled = "disabled") : (prevDisabled = ""); 
    html += `<li class="page-item ${prevDisabled}"><a class="page-link" onclick="getData('${info.previous}')">Previous</a></li>`;
    (info.next == null) ? (nextDisabled = "disabled") : (nextDisabled = "");
    html += `<li class="page-item ${nextDisabled}"><a class="page-link" onclick="getData('${info.next}')">Next</a></li>`;
    document.getElementById("paginacion").innerHTML =html;
}


// Activo o invoco la funcion
getData(API)