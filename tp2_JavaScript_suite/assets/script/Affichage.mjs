export default class Affichage {

    /**
     * Fonctionnalité de placement de variables dans gabarit et mise dans l'espace parent
     * Quantité de gabarits depends de la quantité des données DATA
     * @param {*} data - les objets data
     * @param {*} gabarit - HTML avec variable à mettre
     * @param {*} domParent - Espace HTML ou mettre le contenu
     */
    static afficher(data, gabarit, domParent=null){
        let chaineHTML = "";

        // Si object n'est pas une liste, remplace tout de suite
        if(!Array.isArray(data)){
            let sGabarit = gabarit.innerHTML;
            chaineHTML = Affichage.#remplacement(data, sGabarit);

        // Si object est liste, remplace un par un
        } else {
            let aChaineHTML = data.map(unElement =>{
                let sGabarit = gabarit.innerHTML;
                return Affichage.#remplacement(unElement, sGabarit);
            })
            chaineHTML = aChaineHTML.join(" ");
        }

        // Converti en HTML le resultat
        if(domParent){
            domParent.innerHTML = chaineHTML;
        }
        return chaineHTML
    }

    /**
     * Parcours l'objet et remplace les case dans gabarit par des elements
     * @param {} unElement - Object de data
     * @param {*} sGabarit - HTML gabarit
     * @returns
     * ---- Valide seulement pour les données de citations
     */
    static #remplacement(unElement, sGabarit){
        for(let prop in unElement){
            // Vérification RegEx de presence d'element dans gabarit
            let regexp = new RegExp("\{\{\\s*"+prop+"\\s*\}\}", "g");

            // Si est un object. remplace par sous-element
            if(typeof unElement[prop] == 'object'){
                for(let sousProp in unElement[prop]){
                    regexp = new RegExp("\{\{\\s*"+prop+"."+sousProp+"\\s*\}\}", "g");
                    sGabarit = sGabarit.replace(regexp, unElement[prop][sousProp]);
                }
            // Si n'est pas un object. remplace par element
            } else {
                sGabarit = sGabarit.replace(regexp, unElement[prop]);
            }
        }
        return sGabarit;
    }

}