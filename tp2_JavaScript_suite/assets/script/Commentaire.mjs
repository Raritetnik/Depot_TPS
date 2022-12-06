export default class Commentaires {

    static getListe(params) {
        fetch('http://localhost:8080/wscommentaires/commentaires/'+params.id)
        .then(data => data.json())
        .then((data) => {
            params.cb(data);
        });
    }

    static ajouterCommentaire() {

    }
}