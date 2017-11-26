import helper from './helper'

const endpoints = {
    getMarkets: '/public/getmarkets',
    getCurrencies: '/public/getcurrencies',
    getTicker: '/public/getticker',
    getMarketSummaries: '/public/getmarketsummaries',
    getMarketSummary: '/public/getmarketsummary',
    getOrderBook: '/public/getorderbook',
    getMarketHistory: '/public/getmarkethistory'
}
export function getMarkets() {
    /**
     * Used to get the open and available trading markets 
     * at Bittrex along with other meta data.
     * 
     * Parameters
     * None
     */

    return helper.queryAPI(endpoints.getMarkets); 
}

export function getCurrencies() {
    /**
     * Used to get all supported currencies at 
     * Bittrex along with other meta data.
     * 
     * Parameters
     * None
     */

    return helper.queryAPI(endpoints.getCurrencies);
}

export function getTicker(market) {
    /**
     * Used to get the current tick values for a market.
     * 
     * Parameters
     * parameter	required	description
     * market	    required	a string literal for the market (ex: BTC-LTC)
     */

    let params = {
        market
    };

    return helper.queryAPI(endpoints.getTicker, params=params);
}

export function getMarketSummaries() {

    /**
     * Used to get the last 24 hour summary of all active exchanges
     * 
     * Parameters  
     * None
     */

    return helper.queryAPI(endpoints.getMarketSummaries);
}

export function getMarketSummary(market) {

    /**
     * Used to get the last 24 hour summary of all active exchanges
     * 
     * Parameters
     * parameter	required	description
     * market	    required	a string literal for the market (ex: BTC-LTC)
     */

    let params = {
        market
    }

    return helper.queryAPI(endpoints.getMarketSummary, params);
}

export function getOrderBook(market, type) {

    /**
     * Used to get retrieve the orderbook for a given market
     * 
     * Parameters
     * parameter	required	description
     * market	    required	a string literal for the market (ex: BTC-LTC)
     * type	        required	buy, sell or both to identify the type of orderbook to return.
     */

    let params = {
        market, type
    }  
    return helper.queryAPI(endpoints.getOrderBook, params);
}  

export function getMarketHistory(market) {
 
    /**
     * Used to retrieve the latest trades that have occured for a specific market.
     * 
     * Parameters
     * parameter	required	description
     * market	    required	a string literal for the market (ex: BTC-LTC)
     */
    return helper.queryAPI(endpoints.getMarketHistory);
} 
