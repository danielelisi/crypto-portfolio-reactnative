import { Z_DEFAULT_COMPRESSION } from "zlib";
import { SIGALRM } from "constants";

export function getEquivalent(currency='USD') {
    return fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
            .then( response => response.json() )
}

export const names = {
    BTC:'Bitcoin',
    XBT:'Bitcoin',
    LTC:'Litecoin',
    NMC:'Namecoin',
    STC:'Swiftcoin',
    PPC:'Peercoin',
    DOGE:'Dogecoin',
    XDG:'Dogecoin',
    EMC:'Emercoin',
    GRC:'Gridcoin',
    MSC:'Omni',
    XPM:'Primecoin',
    XRP:'Ripple',
    AUR:'Auroracoin',
    BC:'Blackcoin',
    BURST:'Burstcoin',
    DASH:'Dash',
    XDN:'DigitalNote',
    MZC:'MazaCoin',
    XMR:'Monero',
    NEM:'NEM',
    NXT:'Nxt',
    POT:'PotCoin',
    AMP:'Synereo AMP',
    TIT:'Titcoin',
    VTC:'Vertcoin',
    ETH:'Ehtereum',
    IOT:'IOTA',
    MIOT:'IOTA',
    SIL:'SixEleven',
    DCR:'Decred',
    WAVE:'Waves Platform',
    ZEC:'Zcash',
    ARK:'Ark Ecosystem',
    BCH:'Bitcoin Cash',
    BCC:'Bitcoin Cash',
    UBQ:'Ubiq',
    USDT: 'USD Tether',
    OMG: 'OmiseGO',
    NEO: 'Neo',
    BTG: 'Bitcoin Gold',
    NAV: 'NAVCoin'
}