import {dataOeuvres} from "../data/oeuvresdonneesouvertes.js";
import Catalogue from "./Catalogue.mjs";
import Filtre from "./Filtre.mjs";
import Recherche from "./Recherche.mjs";

import Affichage from "./Affichage.mjs";
import Routeur from "./Routeur.mjs";



export default class Application{
    #oFiltre;
    #oCatalogue;
    #oRecherche;

    #routeur;
    #domParent;
    #domPageListe;
    #domCarte;
    #domEspaceListe;
    #domFiltreListe
    #domDetail;

    constructor(){
        this.#domParent = document.querySelector("main");

        // Recuperer template de liste affichage
        this.#domPageListe = document.querySelector('#tmpl-liste-oeuvres');
        this.#domDetail = document.querySelector('#tmpl-detail-oeuvre');

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

        this.#domEspaceListe = document.querySelector('.catalogue');
        this.#domFiltreListe = document.querySelector('.liste-categorie');


        this.#oFiltre = new Filtre(this.#domFiltreListe);
        this.#oFiltre.setCategorie(dataOeuvres);
        this.#oFiltre.rendu();

        this.#domCarte = document.querySelector('#tmpl-carte-oeuvre')
        this.#oCatalogue = new Catalogue(this.#domEspaceListe);
        this.#oCatalogue.setOeuvres(dataOeuvres);
        Affichage.afficher(dataOeuvres, this.#domCarte, this.#domEspaceListe)

        this.reactionEvenement();
    }

    reactionEvenement() {
        const typeAffichage = document.querySelector('.catalogue_sort');
        let triAsc = true;

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
                    if(triAsc) {
                        Affichage.afficher(
                            this.#oCatalogue.trierAffichage('ASC', selectedOption.value),
                            this.#domCarte,
                            this.#domEspaceListe
                        );
                        triAsc = false;
                    } else {
                        Affichage.afficher(
                            this.#oCatalogue.trierAffichage('DESC', selectedOption.value),
                            this.#domCarte,
                            this.#domEspaceListe
                        );
                        triAsc = true;
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
        Affichage.afficher("", this.#domDetail, this.#domParent);
    }

    /**
     * Affichage de la liste des oeuvres
     * @param {*} e
     */
    routeAccueil(e) {

    }

    /**
     * Fonctionnalités d'affichage des options de catégorie
     * @param {*} e
     */
    afficherFiltres(e) {
        const cible = e.target;
        const filterOption = cible.closest('div');
        console.log(filterOption);
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
                console.log(cible.dataset.jsActif);
                dataFiltre = this.#oFiltre.appliquerFiltre(param);
            }
            Affichage.afficher(dataFiltre, this.#domCarte, this.#domEspaceListe);
        }
    }

    /**
     * Recherche
     */
    appliquerRecherche() {
        const domCaseRecherche = document.querySelector("[name='champs-rechercher']");
        let listeOeuvres = this.#oRecherche.appliquerRecherche(domCaseRecherche.value.trim());
        this.#oCatalogue.setOeuvres(listeOeuvres);
        this.#oCatalogue.rendu();
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