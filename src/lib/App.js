/*
 * Available languages array
 */
const cookieLawStates = [
    'AT',
    'BE',
    'BG',
    'BR',
    'CY',
    'CZ',
    'DE',
    'DK',
    'EE',
    'EL',
    'ES',
    'FI',
    'FR',
    'GB',
    'HR',
    'HU',
    'IE',
    'IT',
    'LT',
    'LU',
    'LV',
    'MT',
    'NL',
    'PL',
    'PT',
    'RO',
    'SE',
    'SI',
    'SK'
];

let startup = false;

/**
 * FadeOut effect
 * @param {HTMLElement} el - Element
 * @param {number} speed - effect duration
 * @return null
 */
const fadeOut = (el, speed) => {
    const s = el.style;
    s.opacity = 1;
    (function fade() {
        (s.opacity -= 0.1) < 0.1 ? s.display = 'none' : setTimeout(fade, (speed / 10));
    })();
};

/**
 * Get MoveToDigital Cookie Bar cookie if available
 * @return {string} cookie value
 */
const getCookie = () => {
    const cookieValue = document.cookie.match(/(;)?cookiestatus=([^;]*);?/);

    if (cookieValue == null) {
        return undefined;
    } else {
        return decodeURI(cookieValue[2]);
    }
};
/**
 * Write MoveToDigital Cookie Bar's cookie when user accepts cookies :)
 * @param {string} name - cookie name
 * @param {string} value - cookie value
 * @return null
 */
const setCookie = (name, value) => {
    const exdays = 30;

    const exdate = new Date();
    exdate.setDate(exdate.getDate() + parseInt(exdays));
    const cValue = encodeURI(value) + ((exdays === null) ? '' : '; expires=' + exdate.toUTCString() + ';path=/');
    document.cookie = name + '=' + cValue;
};

/**
 * Remove all the cookies and empty localStorage when user refuses cookies
 * @return null
 */
const removeCookies = () => {
    // Clear cookies
    document.cookie.split(';').forEach(function (c) {
        document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });

    // Clear localStorage
    localStorage && localStorage.clear();
};

/**
 * Render cookie bar <div> component
 * @return null
 */
const initCookieBar = () => {
    console.log('[cookie-bar] Initialization');
    // If at least a cookie or localstorage is set, then STARTUP
    if (document.cookie.length > 0 || window.localStorage.length > 0) {
        const accepted = getCookie();
        if (accepted === undefined) {
            startup = true;
        }
    } else {
        startup = false;
    }

    if (!startup) {
        return
    }

    const cookieBarConfig = {
        background: 'rgba(0, 0, 0, 0.74)',
        color: '#c8c8c8',
        bottom: 0,
        width: '100%',
        fontFamily: 'system-ui',
        fontSize: '14px',
        text: 'This website uses cookies, to provide the necessary website functionality and improve your experience. By using this website, you agree to our <a target="_blank" href="/cookie-policy" style="border-bottom: 1px solid #c8c8c8; color: #c8c8c8; text-decoration: none; cursor: pointer;">cookie policy.</a>',
        agreeText: 'ACCEPT',

        buttonColor: 'white',
        buttonBackground: 'black',
        disableText: 'Disable cookies',
        onDisableButtonClick: () => {
            console.log('[cookie-bar] Please, declare disable function.');
        },
        ...window.cookieBarConfig,
    };

    var element = document.createElement('div');

    element.innerHTML = "" +
        "<div style='display: flex;align-items: center;justify-content: space-between;padding: 14px'>" +
        "<span>" + cookieBarConfig.text +
        "</span>" +
        "<div style='display: flex;align-items: center;'>" +
        " <a id='cookie-disable' style='border-bottom: 1px solid " + cookieBarConfig.color + "; color: " + cookieBarConfig.color + "; text-decoration: none; cursor: pointer; margin: 0 16px'>" + cookieBarConfig.disableText + "</a>" +
        "<button id='cookie-confirm' style='border-radius: 0; background: " + cookieBarConfig.buttonBackground + "; color: " + cookieBarConfig.buttonColor + "; border: none; padding: 8px 20px 8px 20px; cursor: pointer;'>" +
        cookieBarConfig.agreeText +
        "</button>" +
        "</div>" +
        "</div>";

    element.style.position = 'fixed';
    element.style.zIndex = '10';
    element.style.background = cookieBarConfig.background;
    element.style.color = cookieBarConfig.color;
    element.style.bottom = cookieBarConfig.bottom;
    element.style.width = cookieBarConfig.width;
    element.style.fontFamily = cookieBarConfig.fontFamily;
    element.style.fontSize = cookieBarConfig.fontSize;
    document.getElementsByTagName('body')[0].appendChild(element);

    const confirmButton = document.getElementById('cookie-confirm');
    confirmButton.addEventListener('click', function () {
        setCookie('cookiestatus', 'allow-cookie');
        fadeOut(element, 150);
    });

    const disableButton = document.getElementById('cookie-disable');
    disableButton.addEventListener('click', function () {
        var txt = 'Are you sure that you want to disable cookies?';
        var confirm = window.confirm(txt);
        if (confirm === true) {
            removeCookies();
            setCookie('cookiestatus', 'disable-cookie');
            cookieBarConfig.onDisableButtonClick();
            fadeOut(element, 150);
        }
    });
};

/**
 * Initial cookie script
 * @return null
 */
export const setupCookieBar = () => {

    // Get the users current cookie selection
    const currentCookieSelection = getCookie();

    /**
     * If cookies are disallowed, delete all the cookies at every refresh
     * @param null
     * @return null
     */
    // eslint-disable-next-line eqeqeq
    if (currentCookieSelection === 'disable-cookie') {
        removeCookies();
        setCookie('cookiestatus', 'disable-cookie');
    }

    // Stop further execution,
    // if the user already allowed / disallowed cookie usage.
    if (currentCookieSelection !== undefined) {
        return;
    }

    // If the user is in EU, then STARTUP
    let checkEurope = new XMLHttpRequest();
    checkEurope.open('GET', 'https://freegeoip.app/json/', true);
    checkEurope.onreadystatechange = function () {
        // Don't process anything else besides finished requests.
        if (checkEurope.readyState !== 4) {
            return;
        }

        // Immediately clear timeout handler in order to avoid multiple executions.
        clearTimeout(xmlHttpTimeout);

        // Process response on case of a successful request.
        if (checkEurope.status === 200) {
            const country = JSON.parse(checkEurope.responseText).country_code;
            if (cookieLawStates.indexOf(country) > -1) {
                startup = true;
            } else {
                // If the user is outside of EEA, allow cookies and refresh if needed
                setCookie('cookiestatus', 'allow-cookie');
            }
        } // Enforce startup, if the webservice returned an error.
        else {
            console.log('error');
            startup = true;
        }

        // Init cookieBAR after geoip localization was finished.
        initCookieBar();
    };

    /*
    * Using an external service for geoip localization could be a long task
    * If it takes more than 1.5 second, start normally
    */
    let xmlHttpTimeout = setTimeout(function () {
        console.log('[cookie-bar] - Timeout for ip geolocation');

        // Make sure, that checkEurope.onreadystatechange() is not called anymore
        // in order to avoid possible multiple executions of initCookieBar().
        checkEurope.onreadystatechange = function () {
        };

        // Abort geoip localization.
        checkEurope.abort();

        // Init cookieBAR after geoip localization was aborted.
        startup = true;
        initCookieBar();
    }, 1500);

    checkEurope.send();
};


class App {
    constructor() {
        setupCookieBar();
    }
}

export default App;
