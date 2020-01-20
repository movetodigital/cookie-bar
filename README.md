## ⭐️ Cookie bar 

- Add insert script from cdn.jsdelivr.net: 
```javascript 1.8
<script src="https://cdn.jsdelivr.net/npm/@movetodigital/cookie-bar@latest/build/index.min.js"/>
```

- [Optional] Declare config object:
```javascript 1.8
<script>
    window.cookieBarConfig = {
        background: 'rgba(0, 0, 0, 0.74)',
        color: '#c8c8c8',
        bottom: 0,
        width: '100%',
        fontFamily: 'system-ui',
        fontSize: '14px',
        text: 'This website uses cookies, to provide the necessary website functionality and improve your experience. By using this website, you agree to our <a target="_blank" href="/cookie-police" style="border-bottom: 1px solid #c8c8c8; color: #c8c8c8; text-decoration: none; cursor: pointer;">cookie policy.</a>',
        agreeText: 'ACCEPT',
        buttonColor: 'white',
        buttonBackground: 'black',
        disableText: 'Disable cookies',
        onDisableButtonClick: () => {
        },
    }
</script>
```

- Add initialization script:
```javascript 1.8
<script>
   let CookieBar = window.CookieBar.default;
   let libraryInstance = new CookieBar();
</script>
```
