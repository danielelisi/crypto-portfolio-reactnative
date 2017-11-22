import helper from './helper';

const endpoints = {
    buyLimit: '/market/buylimit',
    sellLimit: '/market/sellLimit',
    cancel: '/market/cancel',
    getOpenOrders: '/market/getopenorders'
}

export function buyLimit(apiKey, apiSecret, market, quantity, rate) {
    /**
     * Used to place a buy order in a specific market. 
     * Use buylimit to place limit orders. 
     * Make sure you have the proper permissions set 
     * on your API keys for this call to work
     * 
     * Parameters
     * parameter	required	description
     * market	    required	a string literal for the market (ex: BTC-LTC)
     * quantity 	required	the amount to purchase
     * rate	        required	the rate at which to place the order.
     */
    let params = {
        market, quantity, rate
    }

    let apiCredentials = {
        apiKey, apiSecret
    }
    return helper.queryAPI(endpoints.buyLimit, params, apiCredentials);
}

export function sellLimit(apiKey, apiSecret, market, quantity, rate) {
    /**
     * Used to place an sell order in a specific market. 
     * Use selllimit to place limit orders. 
     * Make sure you have the proper permissions set on your API keys for this call to work
     * 
     * Parameters
     * parameter	required	description
     * market	    required	a string literal for the market (ex: BTC-LTC)
     * quantity	    required	the amount to purchase
     * rate	        required	the rate at which to place the order
     */

    let params = {
        market, quantity, rate
    }

    let apiCredentials = {
        apiKey, apiSecret
    }

    return helper.queryAPI(endpoints.sellLimit, params, apiCredentials)
} 

export function cancel(apiKey, apiSecret, uuid) {
    /**
     * Used to cancel a buy or sell order.
     * 
     * Parameters
     * parameter	required	description
     * uuid	        required	uuid of buy or sell order
     */

    let params = {uuid}

    let apiCredentials = {
        apiKey, apiSecret
    } 

    return helper.queryAPI(endpoints.cancel, params, apiCredentials)
}

export function getOpenOrders(apiKey, apiSecret, market=null) {
    /**
     * Get all orders that you currently have opened. A specific market can be requested
     * 
     * Parameters
     * parameter	required	description
     * market	    optional	a string literal for the market (ie. BTC-LTC)
    */

    let params = {}
    if (market !== null) {
        params.market = market
    }

    let apiCredentials = {
        apiKey, apiSecret
    }

    return helper.queryAPI(endpoints.getOpenOrders, params, apiCredentials)
}
 