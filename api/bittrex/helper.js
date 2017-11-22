import '../../shim.js'

var hmac = require('create-hmac');


class helper {

    static _baseUri = 'https://bittrex.com/api'
    static _apiVersion = 'v1.1'

    static hashSignature(uri, apiSecret) {
        return hmac('sha512', apiSecret)
                .update(uri)
                .digest('hex');
    }

    static formatAPIUrl(endpoint, apiKey, params) {

        let url = `${helper._baseUri}/${helper._apiVersion}${endpoint}`;

        let isPublic = endpoint.includes('/public/');

        if(!isPublic) {
            url += `?apikey=${apiKey}`;
        }

         url += helper._formatParams(params);

         if(!isPublic) {
            url += `${base}&nonce=${helper._getNonce()}`;
         }

         return url;
    }

    static _formatParams(params) {

        let base = '?';
  
        if(Object.keys(params).length > 0) {
            let index = 0;
            for( let key of Object.keys(params)) {
                if (index !== 0) { base+='&'}
                base += `${key}=${params[key]}`; 
                index++
            } 
        } 

        return base;

    }

    static _getNonce() {
        return new Date().getTime();
    }

    static fetchAPIPromise(uri, headers={}) {
        return fetch(uri, {
            headers: headers
        }).then(response=>response.json());
    }

    static queryAPI(endpoint, params={}, apiKey=null) {
        
        console.log(params)
        const apiUri = helper.formatAPIUrl(endpoint, apiKey, params);
        console.log(apiUri)
        return helper.fetchAPIPromise(apiUri)
    }
     
} 

export default helper;     