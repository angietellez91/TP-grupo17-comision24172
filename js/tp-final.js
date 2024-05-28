document.addEventListener('DOMContentLoaded', () => {
    const escritorios = document.querySelectorAll('.escritorio');
    const selectElement = document.getElementById('escritorioSelect');
    const seleccionarBtn = document.getElementById('seleccionarBtn');
    const deseleccionarBtn = document.getElementById('deseleccionarBtn');

    // Función para seleccionar un escritorio
    seleccionarBtn.addEventListener('click', () => {
        const escritorioId = selectElement.value;
        if (escritorioId) {
            const escritorio = document.getElementById(escritorioId);
            if (!escritorio.classList.contains('ocupado')) {
                escritorio.classList.add('ocupado');
                escritorio.textContent += ' - Ocupado';
                selectElement.querySelector(`option[value="${escritorioId}"]`).disabled = true;
            }
        }
    });

    // Función para deseleccionar un escritorio
    deseleccionarBtn.addEventListener('click', () => {
        const escritorioId = selectElement.value;
        if (escritorioId) {
            const escritorio = document.getElementById(escritorioId);
            if (escritorio.classList.contains('ocupado')) {
                escritorio.classList.remove('ocupado');
                escritorio.textContent = escritorio.textContent.replace(' - Ocupado', '');
                selectElement.querySelector(`option[value="${escritorioId}"]`).disabled = false;
            }
        }
    });
});

let persona = document.querySelector("#Persona");
let personaCopia = persona.cloneNode(true);

let contenedor = document.querySelector("main");

/*persona.remove()*/

let botonAgregar = document.querySelector("#Agregar");
botonAgregar.addEventListener("click", AgregarPersona);

let botonQuitar = document.querySelector("#Quitar");
botonQuitar.addEventListener("click", QuitarPersona)

function AgregarPersona(){
    fetch("https://randomuser.me/api")
    .then(response => response.json())
    .then(data => {
        // Procesamiento de la info que llega de la API
        
        let nuevaPersona = personaCopia.cloneNode(true);
            
        nuevaPersona.querySelector("#Foto").src = data.results[0].picture.large;
        nuevaPersona.querySelector("#Foto").alt = "foto CV";
        nuevaPersona.querySelector("#Nombre").innerHTML = data.results[0].name.first + " " + data.results[0].name.last;
        
        contenedor.appendChild(nuevaPersona);    
        })
    .catch(error => console.log("Ocurrió un error! " + error));
}

function QuitarPersona(){
    if(contenedor.childElementCount > 0){
        contenedor.removeChild(contenedor.lastChild);
    }
}