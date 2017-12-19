/* 
    written by Agoston Toth
    https://github.com/DepictYourself
*/

const main = document.getElementsByTagName("main").item(0);

/*
    This function makes an ajax call to an API
    we convert the message to a usable json object
    then display the received data on the webpage
*/
function fccApiCall(latitude, longitude) {
    fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`)
    .then( response => response.json())
    .then( data => {
        //TODO Make a proper show results function or module.
        main.innerHTML = 
        `
        <p>${data.name}, ${data.sys.country}</p>
        <p>${data.main.temp} <span id="degree">°C</span></p>
        <p>${data.weather[0].main}</p>
        `;
    })
    
}

/* 
    geoSuccess will run when we succesfully received the
    user's location. It will set the latitude and longitude
*/
function geoSuccess(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    fccApiCall(latitude, longitude);
};

function geoError() {
    //TODO handle error
};

/* Checking if the geolocation is supported in the browser */
if ("geolocation" in navigator) {
    main.innerHTML = "geolocation is available";

    /* 
    Trying to get the users position. If everything goes ok 
    the geoSuccess function will run
    If we can't, the geoError function will run.
    */
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);

} else {
    main.innerHTML = "geolocation IS NOT available";
}
