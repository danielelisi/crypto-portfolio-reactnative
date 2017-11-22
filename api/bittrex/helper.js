import '../../shim.js'

var hmac = require('create-hmac');


class helper {

    static _baseUri = 'https://bittrex.com/api'
    static _apiVersion = 'v1.1'

    static hashSignature(uri, apiSecret) {
        // return hmac('sha512', apiSecret)
        //         .update(uri)
        //         .digest('hex');
    }

    static formatAPIUrl(endpoint, apiKey, params) {

        let url = `${helper._baseUri}/${helper._apiVersion}/${endpoint}`;

        if(endpoint.includes('/public/')) {
            return url;
        }

        return url + helper._formatParams(apiKey, params)
    }

    static _formatParams(apiKey, params) {

        if (apiKey == null) {
            return '';
        }

        let base = `?apikey=${apiKey}`;

        if(Object.keys(params).length > 0) {
            for( let key of Object.keys(params)) {
                base += `&${key}=${params[key]}`
            }
        }

        return `${base}&nonce=${helper._getNonce()}`;
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
        
        const apiUri = helper.formatAPIUrl(endpoint, apiKey, params);
        return helper.fetchAPIPromise(apiUri)
    }
    
}

export default helper;   