export default class Commentaires {

    #commentaires;
    constructor() {

    }

    getCommentaires(params) {
        console.log("RESSERCHE");
        fetch('http://localhost/wscommentaires/commentaires/'+params.id)
        .then(data => data.text())
        .then(data => JSON.parse(data.replace('fFFFF', '')))
        .then(data =>
            params.cb(data));
   }




    /*getRessources() {
        this.#geographie = dataCountries;
    }*/

    /*getRessources(){
        var headers = new Headers();
        headers.append(`X-CSCAPI-KEY`, "RW9yWWZRSG5OWUh3YXBmbFNZQmJ3WHRPYlB0d0FoakFaMWlpTnpKOA==");

        var requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
            };

        fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
            .then(data=>data.json())
            .then(data=>{
                this.#geographie = data;
            });
    }*/
}