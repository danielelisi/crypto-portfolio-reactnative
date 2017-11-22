import helper from './helper';

const endpoints = {
    getBalances: '/account/getbalances',
    getBalance: '/account/getbalance',
    getDepositAddress: '/account/getdepositaddress',
    withdraw: '/account/withdraw',
    getOrder: '/account/getorder',
    getOrderHistory: '/account/getorderhistory',
    getWithdrawalHistory: '/account/getwithdrawalhistory',
    getDepositHistory: '/account/getdeposithistory',
}

// both api key and secret are needed for these API calls

export function getBalances(apiKey, apiSecret) {
    /**
     * Used to retrieve all balances from your account
     * 
     * Parameters
     * None
     */

    let apiCredentials = {
        apiKey, apiSecret
    }

    return helper.queryAPI(endpoints.getBalances, {}, apiCredentials);
}

export function getBalance(apiKey, apiSecret, currency) {
    /**
     * Used to retrieve the balance from your account for a specific currency.
     * 
     * Parameters
     * parameter	required	description
     * currency	    required	a string literal for the currency (ex: LTC)
     */

     let params = {
        currency
     }

     let apiCredentials = {
        apiKey, apiSecret
    }
    
     return helper.queryAPI(endpoints.getBalance, params, apiCredentials)

}

export function getDepositAddress(apiKey, apiSecret, currency) {
    /**
     * Used to retrieve or generate an address for a specific currency. 
     * If one does not exist, the call will fail and return ADDRESS_GENERATING 
     * until one is available.
     * 
     * Parameters
     * parameter	required	description
     * currency 	required	a string literal for the currency (ie. BTC)
     */

     let params = {
         currency
     }

     let apiCredentials = {
         apiKey, apiSecret
     }

     return helper.queryAPI(endpoints.getDepositAddress, params, apiCredentials);
}

export function withdraw(apiKey, apiSecret, currency, quantity, address, paymentid=null) {

    /**
     * Used to withdraw funds from your account. note: please account for txfee.
     * 
     * Parameters
     * parameter	required	description
     * currency	    required	a string literal for the currency (ie. BTC)
     * quantity	    required	the quantity of coins to withdraw
     * address	    required	the address where to send the funds.
     * paymentid	optional	used for CryptoNotes/BitShareX/Nxt optional field (memo/paymentid)
     */    

    let params = {
        currecy, quantity, address, paymentid
    }

    let apiCredentials = {
        apiKey, apiSecret
    }

    return helper.queryAPI(endpoints.withdraw, params, apiCredentials);
}

export function getOrder(apiKey, apiSecret, uuid) {
    /**
     * Used to retrieve a single order by uuid.
     * 
     * Parameters
     * parameter	required	description
     * uuid         required	the uuid of the buy or sell order
     */

    let params = {
        uuid
    }

    let apiCredentials = {
        apiKey, apiSecret
    }

    return helper.queryAPI(endpoints.getOrder, params, apiCredentials);
}

export function getOrderHistory(apiKey, apiSecret, market=null) {
    /**
     * Used to retrieve your order history.
     * 
     * Parameters
     * parameter	required	description
     * market	    optional	a string literal for the market (ie. BTC-LTC). If ommited, will return for all markets
     */

    let params = {
        market
    }

    let apiCredentials = {
        apiKey, apiSecret
    }

    return helper.queryAPI(endpoints.getOrderHistory, params, apiCredentials);

}

export function getWithdrawHistory(apiKey, apiSecret, currency=null) {
    /**
     * Used to retrieve your withdrawal history.
     * 
     * Parameters
     * 
     * parameter	required	description
     * currency	    optional	a string literal for the currecy (ie. BTC). If omitted, will return for all currencies
     */

    let params = {
        currency
    }

    let apiCredentials = {
        apiKey, apiSecret
    }

    return helper.queryAPI(endpoints.getWithdrawalHistory, params, apiCredentials);
}

export function getDeposityHistory(apiKey, apiSecret, currency=null) {
    /**
     * Used to retrieve your deposit history.
     * 
     * Parameters
     * parameter	required	description
     * currency 	optional	a string literal for the currecy (ie. BTC). If omitted, will return for all currencies
     */

     let params = {
         currency
     }

     let apiCredentials = {
         apiKey, apiSecret
     }

     return helper.queryAPI(endpoints.getDepositHistory, params, apiCredentials);
}