import Recherche from "./Recherche.mjs";
import Affichage from "./Affichage.mjs";

export default class Filtre{
    #domParent;
    #aData;
    #aTousCatFiltre =[{
        propriete : "Materiaux",
        etiquette : "Materiaux",
        valeurs : []
    },
    {
        propriete : "NomCollection",
        etiquette : "Nom de la collection",
        valeurs : []
    },
    {
        propriete : "Parc",
        etiquette : "Parc",
        valeurs : []
    },
    {
        propriete : "ModeAcquisition",
        etiquette : "ModeAcquisition",
        valeurs : []
    },
    {
        propriete : "Arrondissement",
        etiquette : "Arrondissement",
        valeurs : []
    },
    {
        propriete : "Artistes",
        etiquette : "Artistes",
        valeurs : []
    }];

    #aAfficherCatFiltre = [];

    constructor(domParent){
        this.#domParent = domParent
    }

    setCategorie(data){
        this.#aData = data;
        for(var catFiltre of this.#aTousCatFiltre){
            let prop = catFiltre.propriete;
            let valeur = [];
            if(prop == 'Materiaux') {
                valeur = this.gestionMatériaux(data, prop);
            } else if(prop == 'Artistes') {
                valeur = this.gestionArtistes(data)
            } else {
                data.forEach(unOeuvre => {
                    if(unOeuvre[prop] != null ) {
                        valeur.push(unOeuvre[prop]);
                    }
                });
            }

            valeur.sort();
            valeur = [...(new Set(valeur))];    // Avec l'opérateur de décomposition (spread operator)

            catFiltre.valeurs = valeur;
        };
    }   // Works

    setAffichageFiltre(afficherCatFiltre) {
        this.#aAfficherCatFiltre = afficherCatFiltre;
    }

    /**
     * Applique les filtres sur les données en fonction des paramètres
     * @param {Object} params
     * @param {String} params.cat - La propriété à filtrer
     * @param {String | Number} params.valeur - La valeur du filtre
     * @return {Array} - Données filtrés
     */
    appliquerFiltre(params){
        let res = [];
        if(params == null){
            res = this.#aData;
        }
        else{
            let valeur = params.valeur;
            res = this.#aData.filter((unElement)=>{
                let dataTexte = unElement[params.cat];
                if(Array.isArray(unElement[params.cat])) {
                    unElement[params.cat].forEach( elemArray => {
                        dataTexte = elemArray.Prenom+" "+elemArray.Nom;
                        return ((dataTexte != null) ?
                            Recherche.compareNoAccents(dataTexte, valeur)
                            : false);
                    });
                }
                return ((dataTexte != null) ?
                Recherche.compareNoAccents(dataTexte, valeur)
                : false);
            })
        }
        return res;
    }   // Works

    rendu(){
        let chaineHTML = "";
        this.#aTousCatFiltre.forEach((uneCatFiltre)=>{
            chaineHTML += `<div id='${uneCatFiltre.propriete}'><p>${uneCatFiltre.etiquette}<span class="material-icons">arrow_drop_up</span></p>`;

            // Afficher seulement les options des filtres qui sont dans aAfficherCatFiltre
            let bool = this.#aAfficherCatFiltre.filter(a => {return a.propriete == uneCatFiltre.propriete; }).length;
            if(bool > 0){
                uneCatFiltre.valeurs.forEach((uneValeur)=>{
                    chaineHTML += `<li class="choixFiltre" data-js-cat="${uneCatFiltre.propriete}" data-js-cat-valeur="${uneValeur}" data-js-actif="0">${uneValeur}</li>`;
                })
            }
            chaineHTML += `</div>`;
        });
        return this.#domParent.innerHTML = chaineHTML;
    }

    /**
     * La fonction fait afficher ou cacher les option des filtres appuyés par utilisateur
     * @param {String} param - Nom de filtre choisie
     * @returns
     */
    gestionOption(param) {
        let res = []
        res = this.#aTousCatFiltre.find(a => {
            return a.propriete == param;
        });
        if(this.#aAfficherCatFiltre.find(a => a.propriete == (param)) === undefined) {
            this.#aAfficherCatFiltre.unshift(res);
        } else {
            let temp = []
            temp = this.#aAfficherCatFiltre.filter(a => (!(a.propriete == (param))));
            this.#aAfficherCatFiltre = temp;
        }
    } // Works

  /**************************** Fonctions Optionnels ********************************** */

    /**
     * @param {String} mot - Reçoit un mot à mofidier
     * @returns le même mot avec la première lettre en majuscule
     */
    premLettreMaj(mot) {
        return mot.charAt(0).toUpperCase() + mot.slice(1);
    } // Works


    /** Gestion des données 'Materiaux' avec les erreurs humains de saisie
     * @param {Array} listeMateriaux - La liste de tous les objets matériaux
     * @param {String} prop - Le nom de catégorie
     * @returns {Array} - La liste des élèments matériaux
     */
    #testText = [', ', '; ', '.', '', undefined, '. '];
    gestionMatériaux(listeMateriaux, prop) {
        let liste = [];
        listeMateriaux.forEach(unOeuvre => {
            const reg = /(\; )|(\.)|(\, )/;
            if(unOeuvre[prop] != null){
                unOeuvre[prop].split(reg).forEach(sousCat => {
                    if(!this.#testText.includes(sousCat)){
                        liste.push(this.premLettreMaj(sousCat.trim()));
                    }
                });
            }
        });
        return liste;
    } /// Works

    gestionArtistes(listesArtistes) {
        let liste = [];
        listesArtistes.forEach((unOeuvre) => {
            unOeuvre.Artistes.forEach(unArtiste => {
                let nom = (unArtiste.Nom == null) ? "": unArtiste.Nom;
                let prenom = (unArtiste.Prenom == null) ? "": unArtiste.Prenom;
                liste.push(prenom+" "+nom);
            });
        });
        return liste;
    }

}