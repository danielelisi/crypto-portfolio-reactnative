import '../../shim.js'

var hmac = require('create-hmac');


class helper {

    static _baseUri = 'https://bittrex.com/api'
    static _apiVersion = 'v1.1'

    static _hashSignature(uri, apiSecret) {
        return hmac('sha512', apiSecret)
                .update(uri)
                .digest('hex');
    }

    static formatAPIUrl(endpoint, params, apiKey) {

        let url = `${helper._baseUri}/${helper._apiVersion}${endpoint}`;

        let isPublic = endpoint.includes('/public/');

        if(!isPublic) {
            params['apikey'] = apiKey;
            params['nonce'] = helper._getNonce(); 
        }

        url += helper._formatParams(params);

        return url;
    } 
 
    static _formatParams(params) { 
 
        let base = '?' 
        console.log('params') 
        console.log(params) 
        if(Object.keys(params).length > 0) {
            let index = 0;
            for( let key of Object.keys(params)) {
                if (index !== 0)  { base+='&'}
                if(params[key] !== null) {
                    base += `${key}=${params[key]}`; 
                    index++ 
                }
            } 
        }  

        return base;

    }

    static _getNonce() {
        return new Date().getTime();
    }
 
    static fetchAPIPromise(uri, headers) {
        return fetch(uri, {
            headers: headers
        }).then(response=>response.json());
    }

    static queryAPI(endpoint, params={}, apiCredentials=null) {
        
        let isPublic = endpoint.includes('/public/')
        let headers = {}
        const apiUri = helper.formatAPIUrl(endpoint, params, apiCredentials.apiKey);
        console.log(apiUri)
         
        if (!isPublic) {
            let signature = helper._hashSignature(apiUri, apiCredentials.apiSecret);
            headers = {
                apisign: signature
            } 
 
            console.log(signature)
        }
        return helper.fetchAPIPromise(apiUri, headers)
    } 
     
} 

export default helper;     