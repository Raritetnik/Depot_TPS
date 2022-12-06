export default class Recherche{
    static #aFiltreRecherche =[{
        propriete : "Materiaux",
        values: []
    },
    {
        propriete : "NomCollection",
        values: []
    },
    {
        propriete : "Parc",
        values: []
    },
    {
        propriete : "ModeAcquisition",
        values: []
    },
    {
        propriete : "Arrondissement",
        values: []
    },
    {
        propriete : "Batiment",
        values: []
    },
    {
        propriete : "AdresseCivique",
        values: []
    },
    {
        propriete : "Artistes",
        values: ['Nom', 'Prenom']
    },
    {
        propriete : "Titre",
        values: []
    }];

    /**
     * Effectuer une recherche dans la base de données
     * @param {String} param.valeur La valeur de recherche
     * @param {String} param.oeuvres La liste des oeuvres
     * @return {Array} - Données filtrés
     */
     static appliquerRecherche(param){
        let res = [];
        if(param != null){
            this.#aFiltreRecherche.forEach(unParam => {
                let tmpRes = [];
                param.oeuvres.forEach((unElement)=>{
                    if(Array.isArray(unElement[unParam.propriete])) {
                        unElement[unParam.propriete].forEach((unSousElement => {
                            if(unSousElement !== undefined){
                                unParam.values.forEach(valeurFiltre => {
                                    if(unSousElement[`${valeurFiltre}`] == null
                                    || unSousElement[`${valeurFiltre}`] == undefined) {

                                    } else if(Recherche.compareNoAccents(unSousElement[`${valeurFiltre}`], param.valeur)) {
                                        tmpRes.push(unElement);
                                    }
                                });
                            }
                        }));
                    }
                    else if(!(unElement[unParam.propriete] === null || unElement[unParam.propriete] === undefined || unElement[unParam.propriete] === "")) {
                        if(Recherche.compareNoAccents(unElement[unParam.propriete], param.valeur)) {
                            tmpRes.push(unElement);
                        }
                    }
                });
                tmpRes.forEach(a => res.push(a));
            });
        }
        return res;
    } // Works

    /**
     * Fonction enlève les accents dans les mots et fait un recherche dans le mot
     * Source: https://www.30secondsofcode.org/js/s/remove-accents
     * @param {*} texte - Texte de recherche
     * @param {*} mot - Le mot de recherche dans le texte
     * @returns Boolean si le mot est présent dans le texte
     */
    static compareNoAccents(texte, mot) {
        if(mot !== undefined && mot !== null) {
            let texteNoAccents = texte.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            let motNoAccents = mot.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            return texteNoAccents.toLowerCase().includes(motNoAccents.toLowerCase())
        }
        return null;
    } // Works


}