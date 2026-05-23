class Serie {
    
    constructor(id, url, name, language, genres, image) {
        this.id = id;
        this.url = url;
        this.name = name;
        this.language = language;
        this.genres = genres;
        this.image = image;
    }

    toJsonString() {
        return JSON.stringify(this);
    }

    static createFromJsonString(json) {
        let obj = JSON.parse(json); 
        return new Serie(obj.id, obj.url, obj.name, obj.language, obj.genres, obj.image);
    }

    createHtmlElement() {
        let divSerie = document.createElement("div");
        divSerie.className = "card border-secondary shadow-sm h-100";

        let img = document.createElement("img");
        img.src = this.image;
        img.className = "card-img-top"; 
        img.style.cursor = "pointer";
        
        img.addEventListener("click", () => {
            window.open(this.url, "_blank");
        });
    
        let serieBody = document.createElement("div");
        serieBody.className = "card-body d-flex flex-column align-items-center justify-content-center text-center";
        
        let titulo = document.createElement("h5");
        titulo.innerText = this.name;
        titulo.className = "card-title text-dark text-capitalize"; 

        let parrafoLanguage= document.createElement("p");
        parrafoLanguage.innerText = "Idioma: " + this.language;
        parrafoLanguage.className = "card-text text-muted mb-3";

        let parrafoGeneres= document.createElement("p");
        parrafoGeneres.innerText = "Géneros: " + this.genres.join(", ");
        parrafoGeneres.className = "card-text text-muted mb-3";

        let btnGuardar = document.createElement("button");
        btnGuardar.innerText = "Guardar";
        btnGuardar.className = "btn btn-outline-success mt-auto w-100"; 
        btnGuardar.addEventListener("click", () => {
             Serie.guardarSerie(this);
        });

        serieBody.appendChild(titulo);
        serieBody.appendChild(parrafoLanguage);
        serieBody.appendChild(parrafoGeneres);
        serieBody.appendChild(btnGuardar);

        divSerie.appendChild(img);
        divSerie.appendChild(serieBody);

        return divSerie;
    }

    static guardarSerie(Serie) {
        let guardadas = localStorage.getItem("seriesGuardadas");
        if(guardadas == null) {
            guardadas = [];
        } else {
            guardadas = JSON.parse(guardadas);
        }

        let repetida = false;
        for(let i = 0; i < guardadas.length; i++) {
            if(guardadas[i].id === Serie.id) {
                repetida = true;
            }
        }

        if(!repetida) {
            guardadas.push(Serie);
            localStorage.setItem("seriesGuardadas", JSON.stringify(guardadas));
            alert("Serie guardada correctamente!");
        } else {
            alert("Esta serie ya la habías guardado.");
        }
    }
}