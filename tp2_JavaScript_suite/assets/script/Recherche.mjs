export default class Recherche{
    #aOeuvres;
    #aFiltreRecherche =[{
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

    setOeuvres(data){
        this.#aOeuvres = data;

    }

    /**
     * Effectuer une recherche dans la base de données
     * @param {String} param La valeur de recherche
     * @return {Array} - Données filtrés
     */
     appliquerRecherche(param){
        let res = [];
        if(param == null){
            res = this.#aOeuvres;
        }
        else{
            this.#aFiltreRecherche.forEach(unParam => {
                let tmpRes = [];
                this.#aOeuvres.forEach((unElement)=>{
                    if(Array.isArray(unElement[unParam.propriete])) {
                        unElement[unParam.propriete].forEach((unSousElement => {
                            if(unSousElement !== undefined){
                                unParam.values.forEach(valeurFiltre => {
                                    if(unSousElement[`${valeurFiltre}`] == null
                                    || unSousElement[`${valeurFiltre}`] == undefined) {

                                    } else if(Recherche.compareNoAccents(unSousElement[`${valeurFiltre}`], param)) {
                                        tmpRes.push(unElement);
                                    }
                                });
                            }
                        }));
                    }
                    else if(!(unElement[unParam.propriete] === null || unElement[unParam.propriete] === undefined || unElement[unParam.propriete] === "")) {
                        if(Recherche.compareNoAccents(unElement[unParam.propriete], param)) {
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
     * @param {*} mot_2 - Le mot de recherche dans le texte
     * @returns Boolean si le mot est présent dans le texte
     */
    static compareNoAccents(texte, mot) {
        let texteNoAccents = texte.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        let motNoAccents = mot.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return texteNoAccents.toLowerCase().includes(motNoAccents.toLowerCase())
    } // Works


}