export default class Affichage {
    /**
     * @static
     * @param {*} data
     * @param {*} gabarit
     * @param {*} domParent
     * @param {boolean} bInserer
     */
    static afficher(data, gabarit, domParent=null){
        let chaineHTML = "";
        console.log(data);
        if(!Array.isArray(data)){
            let sGabarit = gabarit.innerHTML;
            chaineHTML = Affichage.#remplacement(data, sGabarit);
        }else{
            console.log('DANS ELSE');
            let aChaineHTML = data.map(unElement =>{
                let sGabarit = gabarit.innerHTML;
                return Affichage.#remplacement(unElement, sGabarit);
            })
            chaineHTML = aChaineHTML.join(" ");
        }


        if(domParent){
            domParent.innerHTML = chaineHTML;
        }
        return chaineHTML
    }

    static #remplacement(unElement, sGabarit){
        for(let prop in unElement){
            let regexp = new RegExp("\{\{\\s*"+prop+"\\s*\}\}", "g");  //{{prop}} ou {{ prop }}
            sGabarit = sGabarit.replace(regexp, unElement[prop]);
        }
        return sGabarit;
    }

}