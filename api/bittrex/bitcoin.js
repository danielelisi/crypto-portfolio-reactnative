import { Z_DEFAULT_COMPRESSION } from "zlib";
import { SIGALRM } from "constants";

export function getEquivalent(currency='USD') {
    return fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
            .then( response => response.json() )
}
