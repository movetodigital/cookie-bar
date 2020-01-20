!function(e){var o={};function __webpack_require__(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,__webpack_require__),n.l=!0,n.exports}__webpack_require__.m=e,__webpack_require__.c=o,__webpack_require__.d=function(e,o,t){__webpack_require__.o(e,o)||Object.defineProperty(e,o,{enumerable:!0,get:t})},__webpack_require__.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},__webpack_require__.t=function(e,o){if(1&o&&(e=__webpack_require__(e)),8&o)return e;if(4&o&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(__webpack_require__.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&o&&"string"!=typeof e)for(var n in e)__webpack_require__.d(t,n,function(o){return e[o]}.bind(null,n));return t},__webpack_require__.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return __webpack_require__.d(o,"a",o),o},__webpack_require__.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s=0)}([function(e,o,t){e.exports=t(1)},function(e,o,t){"use strict";function _defineProperty(e,o,t){return o in e?Object.defineProperty(e,o,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[o]=t,e}function ownKeys(e,o){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);o&&(n=n.filter((function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable}))),t.push.apply(t,n)}return t}t.r(o);var n=["AT","BE","BG","BR","CY","CZ","DE","DK","EE","EL","ES","FI","FR","GB","HR","HU","IE","IT","LT","LU","LV","MT","NL","PL","PT","RO","SE","SI","SK"],r=!1,fadeOut=function(e,o){var t=e.style;t.opacity=1,function fade(){(t.opacity-=.1)<.1?t.display="none":setTimeout(fade,o/10)}()},getCookie=function(){var e=document.cookie.match(/(;)?cookiestatus=([^;]*);?/);return null==e?void 0:decodeURI(e[2])},setCookie=function(e,o){var t=new Date;t.setDate(t.getDate()+parseInt(30));var n=encodeURI(o)+"; expires="+t.toUTCString()+";path=/";document.cookie=e+"="+n},removeCookies=function(){document.cookie.split(";").forEach((function(e){document.cookie=e.replace(/^ +/,"").replace(/=.*/,"=;expires="+(new Date).toUTCString()+";path=/")})),localStorage&&localStorage.clear()},initCookieBar=function(){(console.log("[cookie-bar] Initialization"),document.cookie.length>0||window.localStorage.length>0)?void 0===getCookie()&&(r=!0):r=!1;if(r){var e=function(e){for(var o=1;o<arguments.length;o++){var t=null!=arguments[o]?arguments[o]:{};o%2?ownKeys(Object(t),!0).forEach((function(o){_defineProperty(e,o,t[o])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(t,o))}))}return e}({background:"rgba(0, 0, 0, 0.74)",color:"#c8c8c8",bottom:0,width:"100%",fontFamily:"system-ui",fontSize:"14px",text:'This website uses cookies, to provide the necessary website functionality and improve your experience. By using this website, you agree to our <a target="_blank" href="/cookie-police" style="border-bottom: 1px solid #c8c8c8; color: #c8c8c8; text-decoration: none; cursor: pointer;">cookie policy.</a>',agreeText:"ACCEPT",buttonColor:"white",buttonBackground:"black",disableText:"Disable cookies",onDisableButtonClick:function(){console.log("[cookie-bar] Please, declare disable function.")}},window.cookieBarConfig),o=document.createElement("div");o.innerHTML="<div style='display: flex;align-items: center;justify-content: space-between;padding: 14px'><span>"+e.text+"</span><div style='display: flex;align-items: center;'> <a id='cookie-disable' style='border-bottom: 1px solid "+e.color+"; color: "+e.color+"; text-decoration: none; cursor: pointer; margin: 0 16px'>"+e.disableText+"</a><button id='cookie-confirm' style='border-radius: 0; background: "+e.buttonBackground+"; color: "+e.buttonColor+"; border: none; padding: 8px 20px 8px 20px; cursor: pointer;'>"+e.agreeText+"</button></div></div>",o.style.position="fixed",o.style.background=e.background,o.style.color=e.color,o.style.bottom=e.bottom,o.style.width=e.width,o.style.fontFamily=e.fontFamily,o.style.fontSize=e.fontSize,document.getElementsByTagName("body")[0].appendChild(o),document.getElementById("cookie-confirm").addEventListener("click",(function(){setCookie("cookiestatus","allow-cookie"),fadeOut(o,150)})),document.getElementById("cookie-disable").addEventListener("click",(function(){!0===window.confirm("Are you sure that you want to disable cookies?")&&(removeCookies(),setCookie("cookiestatus","disable-cookie"),e.onDisableButtonClick(),fadeOut(o,150))}))}},i=function App(){!function(e,o){if(!(e instanceof o))throw new TypeError("Cannot call a class as a function")}(this,App),function(){var e=getCookie();if("disable-cookie"===e&&(removeCookies(),setCookie("cookiestatus","disable-cookie")),void 0===e){var o=new XMLHttpRequest;o.open("GET","https://freegeoip.app/json/",!0),o.onreadystatechange=function(){if(4===o.readyState){if(clearTimeout(t),200===o.status){var e=JSON.parse(o.responseText).country_code;n.indexOf(e)>-1?r=!0:setCookie("cookiestatus","allow-cookie")}else console.log("error"),r=!0;initCookieBar()}};var t=setTimeout((function(){console.log("[cookie-bar] - Timeout for ip geolocation"),o.onreadystatechange=function(){},o.abort(),r=!0,initCookieBar()}),1500);o.send()}}()};new function App(){!function(e,o){if(!(e instanceof o))throw new TypeError("Cannot call a class as a function")}(this,App);var e=new i;console.log("Lib loaded!",e)}}]);
//# sourceMappingURL=index.js.map