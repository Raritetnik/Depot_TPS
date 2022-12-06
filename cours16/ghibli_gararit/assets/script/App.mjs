import Affichage from "./Affichage.mjs";
import Ghibli from "./Ghibli.mjs";
import Routeur from "./Routeur.mjs";

export default class App {
    URLGhibli = "https://ghibliapi.herokuapp.com/";
    #routeur;
    #domParent;

    constructor(){
        this.oGhibli = new Ghibli();
        
        this.#domParent = document.querySelector(".catalogue");

        this.#routeur = new Routeur();
        this.#routeur.ajouterRoute("/liste", this.routeFilm.bind(this));
        this.#routeur.ajouterRoute("detail", this.routeDetail.bind(this));
        this.#routeur.ajouterRoute("/", this.routeAccueil.bind(this));
        this.#routeur.demarrer();
    }

    routeAccueil(){
        console.log("accueil")
        this.#routeur.naviguer("/liste?tri=release_date&ordre=DESC", true);
    }

    routeFilm(){
        this.oGhibli.getRessources("films", (data)=>{
            
            data = data.map(unFilm=>{
                unFilm.nbPersonne = unFilm.people.length;
                return unFilm
            })
            console.log(data)


            let infoRoute = this.#routeur.getInfoRoute();
            console.log(infoRoute.parametre)
            if(infoRoute.parametre["filtre"]){
                let filtre= infoRoute.parametre['filtre'];
                let valeurFiltre = infoRoute.parametre['valeurFiltre'];
                data = data.filter((unFilm)=>{
                    return (unFilm[filtre] == valeurFiltre);
                })
            }
            if(infoRoute.parametre["recherche"]){
                let recherche= infoRoute.parametre['recherche'];
                
                data = data.filter((unFilm)=>{
                    return (unFilm.director.toLowerCase().includes(recherche) || unFilm.release_date == recherche || unFilm.description.toLowerCase().includes(recherche));
                })
            }

            if(infoRoute.parametre["tri"]){
                let tri= infoRoute.parametre['tri'];
                let ordre = infoRoute.parametre['ordre'];
                data.sort((a,b)=>{
                    if(a[tri] < b[tri]){
                        return -1;
                    }
                    else if(a[tri] > b[tri]){
                        return 1;
                    }
                    else{
                        return 0;
                    }
                })
                if(ordre == "DESC"){
                    data.reverse();
                }
            }
            
            console.log(data)
            
            this.afficherFilms(data);        

        })
    }

    /**
     * @todo Récupérer les détails d'un film
     */
    routeDetail(){
        console.log("Les détails d'un film");
        let infoRoute = this.#routeur.getInfoRoute();
        
        console.log(infoRoute);
        console.log("id = " + infoRoute.routeActive[1]);
    }

    routePersonnage(){
        this.oGhibli.getRessources("people", (data)=>{
            this.afficherPersonnage(data);        
        })
    }


    afficherFilms(aFilms){
        let gabaritFilm = document.querySelector("#tmpl-carte-film");

        let chaineHtml = "";
        let chainePerso = [];
        Affichage.afficher(aFilms, gabaritFilm, this.#domParent);

        /*aFilms.forEach(unFilm=> {
            chaineHtml += Affichage.afficher(unFilm, gabaritFilm);

        });
        this.#domParent.innerHTML = chaineHtml;
        */
        this.attacherEvenement();
    }

    attacherEvenement(){
        //mettre les addEventListener des éléments générés dynamiquement...

    }
}