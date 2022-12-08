export default class Geographie {


    static getPays(params){
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
                params.callback(data);
            });
    }

    static getEtatParPays(params){
        var headers = new Headers();
        headers.append(`X-CSCAPI-KEY`, "RW9yWWZRSG5OWUh3YXBmbFNZQmJ3WHRPYlB0d0FoakFaMWlpTnpKOA==");

        var requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
            };

        fetch(`https://api.countrystatecity.in/v1/countries/${params.paysCode}/states`, requestOptions)
            .then(data=>data.json())
            .then(data=>{
                params.callback(data);
            });
    }

    static getVilleParPaysEtat(params){
        var headers = new Headers();
        headers.append(`X-CSCAPI-KEY`, "RW9yWWZRSG5OWUh3YXBmbFNZQmJ3WHRPYlB0d0FoakFaMWlpTnpKOA==");

        var requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
            };

        fetch(`https://api.countrystatecity.in/v1/countries/${params.paysCode}/states/${params.etatCode}/cities`, requestOptions)
            .then(data=> data.json())
            .then(data=> params.callback(data));
    }

    static getVilleParPays(params) {
        var headers = new Headers();
        headers.append(`X-CSCAPI-KEY`, "RW9yWWZRSG5OWUh3YXBmbFNZQmJ3WHRPYlB0d0FoakFaMWlpTnpKOA==");

        var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
        };
        console.log(params.paysCode);
        fetch(`https://api.countrystatecity.in/v1/countries/${params.paysCode}/cities`, requestOptions)
        .then(data => data.json())
        .then(data => {
            console.log(data);
            params.callback(data);
        }).catch(error => console.log('error', error));;
    }
}