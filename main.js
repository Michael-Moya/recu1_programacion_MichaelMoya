let pagina = 1;
const SERIES_POR_PAGINA = 6; //perdon se q debe ir en mayuscula
document.addEventListener("DOMContentLoaded", () => {
    cargarSerie();

    let btnSig = document.getElementById("siguiente");
    let btnAnt = document.getElementById("anterior");

    btnSig.addEventListener("click", paginaSiguiente);
    btnAnt.addEventListener("click", paginaAnterior);
});

async function cargarSerie() {
    let contenedorSerie = document.getElementById("series");
    contenedorSerie.innerHTML = ""; 

    let urlApi = "https://api.tvmaze.com/shows/";
    let inicio = (pagina - 1) * SERIES_POR_PAGINA + 1;
    let fin = inicio + SERIES_POR_PAGINA - 1;
    
    for (let i = inicio; i <= fin; i++) {
        try {
            let respuesta = await fetch(`${urlApi}${i}`);
            let datos = await respuesta.json();
           

            let c = datos;
                
            let nuevaSerie = new Serie(c.id, c.url, c.name, c.language, c.genres, c.image?.medium)
            
            contenedorSerie.appendChild(nuevaSerie.createHtmlElement());
            

            if(pagina === 1) {
                document.getElementById("anterior").disabled = true;
            } else {
                document.getElementById("anterior").disabled = false;
            }

        } catch (error) {
            console.log("Hubo un error al traer las Serie: " + error);
     
    }

}
}

function paginaSiguiente() {
    pagina++;
    cargarSerie();
}

function paginaAnterior() {
    if (pagina > 1) {
        pagina--;
        cargarSerie();
    }
}