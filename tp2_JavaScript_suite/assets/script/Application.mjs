import {dataOeuvres} from "../data/oeuvresdonneesouvertes.js";
import Catalogue from "./Catalogue.mjs";
import Filtre from "./Filtre.mjs";
import Recherche from "./Recherche.mjs";
import Geographie from "./Geographie.mjs";

import Affichage from "./Affichage.mjs";
import Routeur from "./Routeur.mjs";
import Commentaires from "./Commentaire.mjs";



export default class Application{
    #oFiltre;
    #oCatalogue;
    #oRecherche;
    #_triAsc = true;
    #oWorld
    #oComment

    #routeur;
    #domParent;
    #domPageListe;
    #domCarte;
    #domEspaceListe;
    #domFiltreListe
    #domDetail;

    constructor(){
        this.#oWorld = new Geographie();
        this.#oWorld.getRessources();

        this.#domParent = document.querySelector("main");

        // Recuperer template de liste affichage
        this.#domPageListe = document.querySelector('#tmpl-liste-oeuvres');
        this.#domDetail = document.querySelector('#tmpl-detail-oeuvre');
        this.#domCarte = document.querySelector('#tmpl-carte-oeuvre');

        this.#oCatalogue = new Catalogue();
        this.#oCatalogue.setOeuvres(dataOeuvres);

        this.#routeur = new Routeur();
        this.#routeur.ajouterRoute("/liste", this.routeListe.bind(this));
        this.#routeur.ajouterRoute("/detail", this.routeDetail.bind(this));
        this.#routeur.ajouterRoute("/", this.routeAccueil.bind(this));
        this.#routeur.demarrer();

    }

    /**
     * Affichage de la liste des oeuvres
     * @param {*} e
     */
    routeListe(e) {
        Affichage.afficher("", this.#domPageListe, this.#domParent);
        this.#domFiltreListe = document.querySelector('.liste-categorie');
        this.#domEspaceListe = document.querySelector('.catalogue');

        this.#oCatalogue.setOeuvres(dataOeuvres);

        this.#oRecherche = new Recherche();
        this.#oRecherche.setOeuvres(dataOeuvres);

        this.#oFiltre = new Filtre(this.#domFiltreListe);
        this.#oFiltre.setCategorie(dataOeuvres);
        this.#oFiltre.rendu();

        Affichage.afficher(dataOeuvres, this.#domCarte, this.#domEspaceListe);

        let infoRoute = this.#routeur.getInfoRoute();
        console.log(Object.keys(infoRoute.parametre).length > 0);
        if(Object.keys(infoRoute.parametre).length > 0) {
            this.appliquerParams(infoRoute);
        }

        this.reactionEvenement();
    }

    appliquerParams(infoRoute) {
        if(infoRoute.parametre['ordre'] != undefined) {
            Affichage.afficher(
                this.#oCatalogue.trierAffichage(infoRoute.parametre.ordre, infoRoute.parametre.tri),
                this.#domCarte,
                this.#domEspaceListe
            );
        }
        if(infoRoute.parametre['catVal'] !== undefined) {
            let param = {
                cat: infoRoute.parametre['cat'],
                valeur : infoRoute.parametre['catVal']
            };
            let dataFiltre = this.#oFiltre.appliquerFiltre(param);
            Affichage.afficher(dataFiltre, this.#domCarte, this.#domEspaceListe);
        }
        if(infoRoute.parametre['search'] != undefined) {
            let listeOeuvres = this.#oRecherche.appliquerRecherche(infoRoute.parametre['search']);
            Affichage.afficher(listeOeuvres,
            this.#domCarte,
            this.#domEspaceListe);
        }
    }

    reactionEvenement() {
        const typeAffichage = document.querySelector('.catalogue_sort');

        // Fonctionnalités de triage du contenu
        typeAffichage.addEventListener('click', (event) => {
            var cible = event.target;
            switch(true) {
                case (cible.classList.contains('btnGrid')):
                    this.#domEspaceListe.classList.remove('liste');
                    break;
                case (cible.classList.contains('btnList')):
                    this.#domEspaceListe.classList.add('liste');
                    break;
                case (cible.classList.contains('btnSort')):
                    const selectedOption = this.#domParent.querySelector('.select-tri');
                    if(this.#_triAsc) {
                        this.#routeur.naviguer("/liste?tri="+selectedOption.value+"&ordre=ASC", true);
                        this.#_triAsc = false;
                    } else {
                        this.#routeur.naviguer("/liste?tri="+selectedOption.value+"&ordre=DESC", true);
                        this.#_triAsc = true;
                    }
                    break;
            }
        });


        // Fonctionnalités de recherche
        const domBtnRecherche = document.querySelector(".btn-rechercher");
        this.#oRecherche = new Recherche();
        this.#oRecherche.setOeuvres(dataOeuvres);
        domBtnRecherche.addEventListener('mousedown', this.appliquerRecherche.bind(this));

        // Fonctionnalités de categories
        this.#domFiltreListe.addEventListener("mousedown", this.appliquerFiltre.bind(this));
        this.#domFiltreListe.addEventListener("mousedown", this.afficherFiltres.bind(this));
    }

    /**
     * Affichage de l'oeuvre en détail
     * @param {*} e
     */

    routeDetail(e) {
        let infoRoute = this.#routeur.getInfoRoute();
        console.log(this.#oCatalogue);
        let data = this.#oCatalogue.getCarteChoisie(infoRoute.parametre['id']);
        Affichage.afficher(data, this.#domDetail, this.#domParent);
        const domComment = document.querySelector('#tmpl-commentaire');
        const domEspaceComment = document.querySelector('.commentaires');

        this.#oComment = new Commentaires();

        let params = {
            id: infoRoute.parametre['id']
        }
        params.cb = ((comments) => {
            console.log(comments);
            console.log(domComment);
            console.log(domEspaceComment);
            Affichage.afficher(comments, domComment, domEspaceComment)
        });

        this.#oComment.getCommentaires(params);
    }

    /**
     * Affichage de la liste des oeuvres
     * @param {*} e
     */
    routeAccueil(e) {
        Affichage.afficher(" ", this.#domParent, this.#domParent);
    }

    /**
     * Fonctionnalités d'affichage des options de catégorie
     * @param {*} e
     */
    afficherFiltres(e) {
        const cible = e.target;
        const filterOption = cible.closest('div');
        if(filterOption !== null && cible.tagName !== "LI") {
            this.#oFiltre.gestionOption(filterOption.id);
        }
        this.#domFiltreListe.innerHTML = this.#oFiltre.rendu();
    }

    appliquerFiltre(e){
        const cible = e.target;
        let dataFiltre;
        if(cible.classList.contains("choixFiltre")){
            if(cible.dataset.jsActif == 1){
                dataFiltre = this.#oFiltre.appliquerFiltre();
                cible.dataset.jsActif = 0;
            }
            else{
                let param = {
                    cat: cible.dataset.jsCat,
                    valeur : cible.dataset.jsCatValeur
                };
                document.querySelectorAll("[data-js-actif='1']").forEach((unElement)=>{
                    unElement.dataset.jsActif = 0;
                })
                cible.dataset.jsActif = 1;
                console.log(param);
                dataFiltre = this.#oFiltre.appliquerFiltre(param);
            }
            this.#routeur.naviguer("/liste?cat="+cible.dataset.jsCat+"&catVal="+cible.dataset.jsCatValeur, true);
        }
    }

    /**
     * Recherche
     */
    appliquerRecherche() {
        const domCaseRecherche = document.querySelector("[name='champs-rechercher']");
        let listeOeuvres = this.#oRecherche.appliquerRecherche(domCaseRecherche.value.trim());
        this.#routeur.naviguer("/liste?search="+domCaseRecherche.value.trim(),true);
        Affichage.afficher(listeOeuvres,
        this.#domCarte,
        this.#domEspaceListe);
    }


    afficherCarteInfo(e) {
        const domAffichageInfo = document.querySelector(".block-info");
        const domAffichageInfoContenu = document.querySelector(".block-info .contenu");

        domAffichageInfo.addEventListener('click', (e) => {
            let cible = e.target;
            if(cible.classList.contains('fermer-popup')) {
                domAffichageInfo.classList.add('invisible');
                domAffichageInfo.addEventListener('transitionend', () => {
                    domAffichageInfo.classList.add('remove');
                });
            }
        })

        const cible = e.target;
        if(cible.closest('.carte') != null) {
            const carteChoisie = this.#oCatalogue.getCarteChoisie(cible.closest('.carte'));
            domAffichageInfo.classList.remove('remove');
            domAffichageInfo.classList.remove('invisible');
            domAffichageInfoContenu.innerHTML = carteChoisie;
        }
    }
}