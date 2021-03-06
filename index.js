const queryString = require('query-string');

const DEFAULT_NAMESPACE = "sqp"
const VALID_UTM_PARAMS = ["utm_source", "utm_campaign", "utm_medium", "utm_term", "utm_content"]

window.sqp = {
    stickParams: function () {
        // Init our config in case people forget to do so
        window.sqpConfig = window.sqpConfig || {}

        const params = queryString.parse(window.location.search)

        VALID_UTM_PARAMS.forEach(function (utmKey) {
            if (params[utmKey]) {
                window.localStorage.setItem(__getStorageKey(utmKey), params[utmKey])
            }
        })

        if (window.sqpConfig.conversionDomain) {
            const conversionLinks = __findConversionDomainLinks(sqpConfig.conversionDomain)
            conversionLinks.forEach(__appendUtmQueryParams)
        } else {
            throw new Error("Unable to find conversionDomain in window.sqpConfig. Please double check setup instructions.")
        }
    }
};

function __getStorageKey(utmKey) {
    return [DEFAULT_NAMESPACE, utmKey].join(".")
}

function __findConversionDomainLinks(domain) {
    const conversionDomainLinks = []
    const allLinks = document.getElementsByTagName("a");

    for (let i = 0; i < allLinks.length; i++) {
        const link = allLinks[i]

        if (link.href.indexOf(domain) !== -1) {
            conversionDomainLinks.push(link)
        }
    }

    return conversionDomainLinks
}

function __appendUtmQueryParams(link) {
    const parsedUrl = queryString.parseUrl(link.href)

    VALID_UTM_PARAMS.forEach(function (utmKey) {
        const utmValueInStorage = window.localStorage.getItem(__getStorageKey(utmKey))

        if (utmValueInStorage) {
            parsedUrl.query[utmKey] = utmValueInStorage
        }
    })

    link.href = queryString.stringifyUrl(parsedUrl)
}
