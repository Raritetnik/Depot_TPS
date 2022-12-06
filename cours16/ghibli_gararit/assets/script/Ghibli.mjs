export default class Ghibli{
    URLGhibli = "https://ghibliapi.herokuapp.com/";
    //URLGhibli = "http://127.0.0.1:5500/cours16/ghibli_gararit/assets/data/film.json";

    /**
     * 
     * @param {String} ressources 
     * @param {function} cb - Fonction de rappel qui prendra les données en paramètre
     
     */
    getRessources(ressources, cb){
        let res;
        const valeurRessource = ["films", "people", "locations", "vehicles", "species"];
        if(valeurRessource.includes(ressources)){
            res = fetch(this.URLGhibli+ressources)
            .then(data=>data.json())
            .then(data=>{
                if(cb){
                    cb(data);
                }
                
            })
        }

    }

    getRessourcesPromise(ressources){
        let res;
        const valeurRessource = ["films", "people", "locations", "vehicles", "species"];
        if(valeurRessource.includes(ressources)){
            res = fetch(this.URLGhibli+ressources)
        }
        return res;
    }

    async getRessourcesAsync(ressources){
        let data = await fetch(this.URLGhibli+ressources);
        data = await data.json();
        console.log(data);
        return data;
    }


    getRessourcesXHR(ressources, cb){
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("load", (e)=>{
            const cible = e.target;
            let data = JSON.parse(cible.response);
            if(cb){
                cb(data)
            }
        })
        xhr.open("GET", this.URLGhibli+"people");
        xhr.send();
        
    }

    


}