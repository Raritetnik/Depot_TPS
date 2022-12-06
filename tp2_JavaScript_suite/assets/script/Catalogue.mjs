import {dataOeuvres} from "../data/oeuvresdonneesouvertes.js";

export default class Catalogue{
    static #aOeuvres;
    #optionsTri = [{
        propriete: 'Titre',
        etiquette: 'Titre'
    },
    {
        propriete: 'Arrondissement',
        etiquette: 'Arrondissement'
    },
    {
        propriete: 'Parc',
        etiquette: 'Parc'
    }];

    static chargementOeuvres(){
        this.#aOeuvres = dataOeuvres;
    }

    static getOeuvres() {
        return this.#aOeuvres;
    }

    /**
     * Applique les filtres sur les données en fonction des paramètres
     * @param {String} carte - Object HTML de catalogue
     * @return {Array} - Données filtrés
     */
    static getCarteChoisie(id) {
        return this.#aOeuvres.find((a) => a['NumeroAccession'] == id);
    } // Works


    /**===============================================================
     *               Les fonctionnalités de triage
     * ===============================================================
     */

    /**
     * @param {String} order - l'ordre d'affichage Ascendant / Descandent
     * @param {String} typeSort - Triage par ... de données
     */
    static trierAffichage(order = 'ASC', typeSort = 'Titre') {
        let res = [];
        res = this.#aOeuvres.sort((a,b) => {
            if(a[`${typeSort}`] == null || b[`${typeSort}`] == null){
                return 0;
            }
            return a[`${typeSort}`].localeCompare(b[`${typeSort}`]);
        });
        if(order == 'DESC') {
            res.reverse();
        }
        return res;
    } // Works

    static renduTri() {
        let chaineHTML = ``;
        this.#optionsTri.forEach( (uneOption) => {
            chaineHTML += `
                <option id='${uneOption.propriete}'>${uneOption.etiquette}</option>`;
        });
        return chaineHTML;
    }
}