/* 
    written by Agoston Toth
    https://github.com/DepictYourself
*/

/*
    This function makes an ajax call to an API
    we convert the message to a usable json object
    then display the received data on the webpage
*/
function fccApiCall(latitude, longitude) {
    fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`)
    .then( response => response.json())
    .then( data => {
        document.getElementById('test').innerHTML = 
        `
        lat: ${data.coord.lat}, lon: ${data.coord.lon}
        ${data.name}, ${data.sys.country}
        ${data.main.temp}
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
    console.log("geolocation is available");

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);

} else {
    console.log("geolocation IS NOT available");
}


