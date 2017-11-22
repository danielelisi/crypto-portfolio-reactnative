import helper from './helper'

const endpoints = {
    getMarkets: '/public/getmarkets',
    getCurrencies: '/public/getcurrencies',
    getTicker: '/public/getticker',
    getMarketSummaries: '/public/getmarketsummaries',
    getmarketSummary: '/public/getmarketsummary',
    getOrderBook: '/public/getorderbook',
    getMarketHistory: '/public/getmarkethistory'
}
export function getMarkets() {
    /**
     * endpoint: /public/getmarkets
     * Used to get the open and available trading markets 
     * at Bittrex along with other meta data.
     * 
     * return promise
     */

    return helper.queryAPI(endpoints.getMarkets) 
}

// export function getCurrencies() {
//     const endpoint = '/public/getcurrencies'
//     const apiUri = helper.formatAPIUrl(endpoint)
    
//     return helper.fetchAPIPromise(apiUri);
// }
