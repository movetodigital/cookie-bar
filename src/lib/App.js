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
    document.cookie.split(';').forEach(function(c) {
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
    console.log('init cookie bar');
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
        background: 'black',
        color: 'white',
        bottom: 0,
        width: '100%',
        fontFamily: 'system-ui',
        fontSize: '16px',
        text: 'We use cookies to improve your experience on our site and to show you personalised advertising.',
        agreeText: 'I\'m OK with that',
        disableText: 'Disable cookies',
        ...window.cookieBarConfig,
    };

    var element = document.createElement('div');

    // " To find out more, read our <a style='border-bottom: 1px solid " + cookieBarConfig.color + "; cursor: pointer;'>privacy policy</a> and <a style='border-bottom: 1px solid " + cookieBarConfig.color + "; cursor: pointer;'>cookie policy</a>."
    element.innerHTML = "" +
        "<div style='display: flex;align-items: center;justify-content: space-between;padding: 14px'>" +
        "<span>" + cookieBarConfig.text  +
        "</span>" +
        "<div style='display: flex;align-items: center;'>" +
        "<button id='cookie-confirm' style='border-radius: 0; background: white; color: black;border: none;padding: 6px 16px 6px 16px; cursor: pointer; margin: 0 6px'>" +
        cookieBarConfig.agreeText +
        "</button>" +
        " <a id='cookie-disable' style='border-bottom: 1px solid " + cookieBarConfig.color + "; cursor: pointer;'>" + cookieBarConfig.disableText + "</a>" +
        "</div>" +
        "</div>";

    element.style.position = 'fixed';
    element.style.background = cookieBarConfig.background;
    element.style.color = cookieBarConfig.color;
    element.style.bottom = cookieBarConfig.bottom;
    element.style.width = cookieBarConfig.width;
    element.style.fontFamily = cookieBarConfig.fontFamily;
    element.style.fontSize = cookieBarConfig.fontSize;
    document.getElementsByTagName('body')[0].appendChild(element);

    const confirmButton = document.getElementById('cookie-confirm');
    confirmButton.addEventListener('click', function() {
        setCookie('cookiestatus', 'allow-cookie');
        fadeOut(element, 150);
    });

    const disableButton =  document.getElementById('cookie-disable');
    disableButton.addEventListener('click', function() {
        var txt = 'Are you sure that you want to disable cookies?';
        var confirm = window.confirm(txt);
        if (confirm === true) {
            removeCookies();
            setCookie('cookiestatus', 'disable-cookie');
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
    checkEurope.onreadystatechange = function() {
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
        console.log('cookieBAR - Timeout for ip geolocation');

        // Make sure, that checkEurope.onreadystatechange() is not called anymore
        // in order to avoid possible multiple executions of initCookieBar().
        checkEurope.onreadystatechange = function() {};

        // Abort geoip localization.
        checkEurope.abort();

        // Init cookieBAR after geoip localization was aborted.
        startup = true;
        initCookieBar();
    }, 1500);

    checkEurope.send();
};


