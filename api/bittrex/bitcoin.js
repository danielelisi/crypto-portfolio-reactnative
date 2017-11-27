import { Z_DEFAULT_COMPRESSION } from "zlib";
import { SIGALRM } from "constants";

export function getEquivalent(currency='USD') {
    return fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
            .then( response => response.json() )
}

export function getCoinList() {
    let promise = fetch('https://www.cryptocompare.com/api/data/coinlist/')
            .then(response => response.json())
            .catch(err=>console.log(err))

    return new Promise(resolve=>{
        promise.then(response=>resolve(response))
    })
}
