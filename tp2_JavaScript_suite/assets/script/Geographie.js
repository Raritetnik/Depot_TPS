class Geographie {

    #geographie;
    constructor() {

    }


    getRessources(){
        var headers = new Headers();
        headers.append(`RW9yWWZRSG5OWUh3YXBmbFNZQmJ3WHRPYlB0d0FoakFaMWlpTnpKOA==`, "API_KEY");

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
    }
}