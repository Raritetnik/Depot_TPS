export default class Catalogue{
    #aOeuvres;
    #domParent;
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

    constructor(domParent){
        this.#domParent = domParent;
    }

    setOeuvres(data){
        this.#aOeuvres = data;
    }

    /**
     * Applique les filtres sur les données en fonction des paramètres
     * @param {String} carte - Object HTML de catalogue
     * @return {Array} - Données filtrés
     */
    getCarteChoisie(carte) {
        const titreCarte = carte.querySelector('h2');
        let oReche;
        let chaineHTML = ``;

        this.#aOeuvres.forEach(unOeuvre => {
            if(titreCarte.innerHTML === unOeuvre.Titre) {
                oReche = unOeuvre;
            }
        });
        let artistes = ``;
            oReche.Artistes.forEach(unArtiste => {
                let nom = (unArtiste.Nom == null) ? "": unArtiste.Nom;
                let prenom = (unArtiste.Prenom == null) ? "": unArtiste.Prenom;
                if(nom == "" && prenom == "") {
                    prenom = 'Auteur inconnue';
                }
                artistes += "<p>Artiste(s): "+prenom+" "+nom+"</p>";
            })
        chaineHTML += `
            <header>
                <h2>${oReche.Titre}</h2>
            </header>
            <div class="contenu">
                <p>Nom de collection: ${oReche.NomCollection}</p>
                <p>Catégorie: ${oReche.CategorieObjet}</p>
                <p>Mode d'acquisition: ${oReche.ModeAcquisition}</p>
                <p>Adresse: ${oReche.AdresseCivique}</p>
                <p>Parc: ${oReche.Parc}</p>
                <p>Batiment: ${oReche.Batiment}</p>
                <p>Materiaux: ${oReche.Materiaux}</p>
                ${artistes}
            </div>`;
        return chaineHTML;
    } // Works


    /**===============================================================
     *               Les fonctionnalités de triage
     * ===============================================================
     */

    /**
     * @param {String} order - l'ordre d'affichage Ascendant / Descandent
     * @param {String} typeSort - Triage par ... de données
     */
    trierAffichage(order = 'ASC', typeSort = 'Titre') {
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

    renduTri() {
        let chaineHTML = ``;
        this.#optionsTri.forEach( (uneOption) => {
            chaineHTML += `
                <option id='${uneOption.propriete}'>${uneOption.etiquette}</option>`;
        });
        return chaineHTML;
    }
}