import {dataCountries} from "../data/countries.js";
export default class Geographie {

    #geographie;
    constructor() {

    }

    getData() {
        return this.#geographie;
    }


    getRessources() {
        this.#geographie = dataCountries;
    }

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