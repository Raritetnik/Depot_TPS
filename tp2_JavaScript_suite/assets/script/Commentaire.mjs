export default class Commentaires {

    static getListe(params) {
        fetch('http://localhost:8080/wscommentaires/commentaires/'+params.id)
        .then(data => data.json())
        .then((data) => {
            params.cb(data);
        });
    }

    static ajouterCommentaire(comment) {
        const data = {
            "id_element": comment.id,
            "nom":comment.nom,
            "prenom":comment.prenom,
            "courriel":comment.courriel,
            "pays":comment.pays,
            "etat":comment.etat,
            "ville":comment.ville,
            "commentaire":comment.commentaire
        }

        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            mode: 'cors'
        };

        console.log(data);
        fetch("http://localhost:8080/wscommentaires/commentaires/"+comment.id, options)
         .then((data) => data.json())
         .then((data) => console.log(data));
    }
}