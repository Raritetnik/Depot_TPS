import Catalogue from "./Catalogue.mjs";
import Filtre from "./Filtre.mjs";
import Recherche from "./Recherche.mjs";
import Geographie from "./Geographie.mjs";

import Affichage from "./Affichage.mjs";
import Routeur from "./Routeur.mjs";
import Commentaires from "./Commentaire.mjs";



export default class Application{
    // Main
    #domParent;


    // Detail
    #domDetail;

    // Liste
    #oFiltre;
    #oCatalogue;
    #oRecherche;
    #_triAsc = true;

    #domPageListe;
    #domCarte;
    #domEspaceListe;
    #domFiltreListe

    // Routeur
    #routeur;

    constructor(){
        this.#domParent = document.querySelector("main");

        // Recuperer template de liste affichage
        this.#domPageListe = document.querySelector('#tmpl-liste-oeuvres');
        this.#domDetail = document.querySelector('#tmpl-detail-oeuvre');
        this.#domCarte = document.querySelector('#tmpl-carte-oeuvre');

        // Chargement des oeuvres
        Catalogue.chargementOeuvres();

        // Chargement des routes sur le site
        this.#routeur = new Routeur();
        this.#routeur.ajouterRoute("/liste", this.routeListe.bind(this));
        this.#routeur.ajouterRoute("/detail", this.routeDetail.bind(this));
        this.#routeur.ajouterRoute("/", this.routeAccueil.bind(this));
        this.#routeur.demarrer();
    }

    /*********************************************************************************************************************
    **************************************************  LES ROUTES  *****************************************************
    ********************************************************************************************************************** */

    /**
     * Affichage de la page vide
     * @param {*} e
     */
     routeAccueil(e) {
        let elm = document.createElement('div');
        Affichage.afficher(" ", elm, this.#domParent);
    }

    /**
     * Affichage de la liste des oeuvres
     */
    routeListe(e) {
        // Premiere affichage
        Affichage.afficher("", this.#domPageListe, this.#domParent);
        this.#domFiltreListe = document.querySelector('.liste-categorie');
        this.#domEspaceListe = document.querySelector('.catalogue');

        // Chargement des filtres
        this.#oFiltre = new Filtre(this.#domFiltreListe);
        this.#oFiltre.setCategorie(Catalogue.getOeuvres());
        this.#oFiltre.rendu();

        Affichage.afficher(Catalogue.getOeuvres(), this.#domCarte, this.#domEspaceListe);
        let infoRoute = this.#routeur.getInfoRoute();
        if(Object.keys(infoRoute.parametre).length > 0) {
            this.appliquerParamsListe(infoRoute.parametre);
        }

        this.gestionEvenementListe();
    }

    /**
     * Affichage de l'oeuvre en détail
     * @param {*} e
     */
     routeDetail(e) {
        let infoRoute = this.#routeur.getInfoRoute();
        Affichage.afficher(Catalogue.getCarteChoisie(infoRoute.parametre['id']), this.#domDetail, this.#domParent);

        // Affichage des artistes
        const artistes = document.querySelector('.detail-artistes');
        const domArtiste = document.querySelector('#tmpl-detail-artistes');
        Affichage.afficher(Catalogue.getCarteChoisie(infoRoute.parametre['id'])['Artistes'], domArtiste, artistes)

        // Affichage des commentaires
        const domComment = document.querySelector('#tmpl-commentaire');
        const domEspaceComment = document.querySelector('.commentaires');
        let params = {
            id: infoRoute.parametre['id']
        }
        params.cb = ((comments) => {
            Affichage.afficher(comments, domComment, domEspaceComment);

        });
        Commentaires.getListe(params);

        this.gestionEvenementDetail();
    }

    /*********************************************************************************************************************
    **************************************************  GESTION URL  *****************************************************
    ********************************************************************************************************************** */

    /**
     * Gestion des paramètres dans URL de la liste
     * @param {*} variables.ordre - L'ordre ASC / DESC
     * @param {*} variables.tri - Le type de filtre
     *
     * @param {*} variables.catVal - Valeur de la Catégorie
     * @param {*} variables.cat - Nom de la Catégorie
     *
     * @param {*} variables.recherche - La valeur de recherche
     */
    appliquerParamsListe(variables) {
        if(variables['ordre'] != undefined) {
            Affichage.afficher(
                Catalogue.trierAffichage(variables.ordre, variables.tri),
                this.#domCarte,
                this.#domEspaceListe
            );
        }
        if(variables['catVal'] !== undefined) {
            let param = {
                cat: variables['cat'],
                valeur : decodeURI(variables['catVal'])
            };
            let dataFiltre = this.#oFiltre.appliquerFiltre(param);
            Affichage.afficher(dataFiltre, this.#domCarte, this.#domEspaceListe);
        }
        if(variables['recherche'] != undefined) {
            let param = {
                valeur: variables['recherche'],
                oeuvres: Catalogue.getOeuvres()
            }
            Affichage.afficher(Recherche.appliquerRecherche(param),
            this.#domCarte,
            this.#domEspaceListe);
        }
    }

    /*********************************************************************************************************************
    **************************************************  GESTION EVENEMENTS  **********************************************
    ********************************************************************************************************************** */

    /**
     * Tout les initialisation des evenement sur la page de liste
     * Gestion de commentaires
     */
    gestionEvenementListe() {
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
        domBtnRecherche.addEventListener('mousedown', () => {
            const valeurRecherche = document.querySelector('[name="champs-rechercher"]').value;
            this.#routeur.naviguer("/liste?recherche="+valeurRecherche, true);
        });

        // Fonctionnalités de categories
        this.#domFiltreListe.addEventListener("mousedown", this.appliquerFiltre.bind(this));
        this.#domFiltreListe.addEventListener("mousedown", this.afficherFiltres.bind(this));
    }

    /**
     * Tout les initialisation des evenement sur la page de details
     * Gestion de commentaires
     */
    gestionEvenementDetail() {
        let params = {};
        let optionDOM = document.createElement('div');
        optionDOM.innerHTML = "<option data-iso='{{ iso2 }}' value='{{ name }}'>{{ name }}</option>";

        const selectPays = document.querySelector('#Pays');
        const selectEtat = document.querySelector('#Etat');
        const selectVille = document.querySelector('#Ville');
        const btnSauve = document.querySelector('#soumettre');
        btnSauve.addEventListener('click', () => {
            var route = this.#routeur.getInfoRoute()
            const formulaitre = document.querySelector('.commentaire');
            console.log(formulaitre);
            let data = {}
            data.id = route.parametre['id'];
            data.nom = formulaitre.querySelector('[name="Nom"]').value;
            data.prenom = formulaitre.querySelector('[name="Prenom"]').value;
            data.courriel = formulaitre.querySelector('[name="Courriel"]').value;

            data.pays = formulaitre.querySelector('[name="Pays"]').value;
            data.etat = formulaitre.querySelector('[name="Etat"]').value;
            data.ville = formulaitre.querySelector('[name="Ville"]').value;

            data.commentaire = formulaitre.querySelector('[name="Commentaire"]').value;

            Commentaires.ajouterCommentaire(data);
            this.#routeur.naviguer('/detail?id='+route.parametre['id'], true);
        });

        params.callback = ((data) => {
            Affichage.afficher(data, optionDOM, selectPays);
        });
        Geographie.getPays(params);
        //data.pays = pays.options[pays.selectedIndex].getAttribute("data-iso");

        selectPays.addEventListener('change', (e) => {
            params.paysCode = e.target.options[e.target.selectedIndex].getAttribute("data-iso");
            params.callback = ((data) => {
                if(data.length == 0) {
                    selectEtat.setAttribute('disabled', '');
                    params.callback = ((data) => {
                        Affichage.afficher(data, optionDOM, selectVille);
                    });
                    Geographie.getVilleParPays(params);
                } else {
                    selectEtat.removeAttribute('disabled', '');
                }
                Affichage.afficher(data, optionDOM, selectEtat);
            });
            Geographie.getEtatParPays(params);
        });



        selectEtat.addEventListener('change', (e) => {
            params.etatCode = e.target.options[e.target.selectedIndex].getAttribute("data-iso");
            params.callback = ((data) => {
                Affichage.afficher(data, optionDOM, selectVille);
            });
            Geographie.getVilleParPaysEtat(params);
        });

    }

    /*********************************************************************************************************************
    **************************************************  LES FILTRES  *****************************************************
    ********************************************************************************************************************** */
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

    /**
     * Application des filtres sur les catégories
     * @param {*} e
     */
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
                dataFiltre = this.#oFiltre.appliquerFiltre(param);
            }
            this.#routeur.naviguer("/liste?cat="+cible.dataset.jsCat+"&catVal="+cible.dataset.jsCatValeur, true);
        }
    }
}