document.addEventListener("DOMContentLoaded", () => {
    mostrarGuardados();

    document.getElementById("ordenarValor").addEventListener("click", ordenarPorValor);
    document.getElementById("ordenarPalo").addEventListener("click", ordenarPorPalo);
});

function mostrarGuardados(arrayCartas = null) {
    let contenedor = document.getElementById("series");
    contenedor.innerHTML = "";

    let guardadas = arrayCartas;
    
    if (guardadas == null) {
        let storage = localStorage.getItem("seriesGuardadas");
        if (storage != null) {
            guardadas = JSON.parse(storage);
        } else {
            guardadas = [];
        }
    }

    if (guardadas.length === 0) {
        contenedor.innerHTML = "<h5 class='text-center w-100 mt-4'>No hay cartas guardadas en tu colección.</h5>";
        return;
    }

    for (let i = 0; i < guardadas.length; i++) {
        let c = guardadas[i];
        let cartaObj = new Serie(c.id, c.url, c.name, c.language, c.genres, c.image);
        let elemento = cartaObj.createHtmlElement();
        
        let btn = elemento.querySelector("button");
        if (btn) {
            btn.remove(); 
        }

        contenedor.appendChild(elemento);
    }
}

function obtenerValorNumerico(valorStr) {
   
    return parseInt(valorStr); 
}

function obtenerValorPalo(paloStr) {
   
    return 5;
}

function ordenarPorNombre() {
    let storage =  localStorage.getItem("seriesGuardadas") ;
    if (storage != null) {
        let guardadas = JSON.parse(storage);
        
        guardadas.sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return 0 ;
        });
        

        mostrarGuardados(guardadas);
    }
}
function ordenarPorIdioma() {
    let storage = localStorage.getItem("seriesGuardadas");
    if (storage != null) {

        let  guardadas = JSON.parse(storage);
        guardadas.sort((a, b) => {
            let idiomaA = a.language.toLowerCase();
            let idiomaB = b.language.toLowerCase();

            if (idiomaA < idiomaB) {
                return -1;
            }
            if (idiomaA > idiomaB) {
                return 1; 
            }
            return 0;     
        }
     ) ;
        
        mostrarGuardados(guardadas); 
    }
}