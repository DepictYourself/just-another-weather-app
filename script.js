/*
    =================================
    written by Agoston Toth
    https://github.com/DepictYourself
    =================================
*/

const main = document.getElementsByTagName("main").item(0);

/*
    This function makes a call to an API
    we convert the message to a usable json object
    then display the received data on the webpage
*/
function fccApiCall(latitude, longitude) {
    fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`)
    .then( response => response.json())
    .then( data => displayData(data))
    
};

/* 
    data argument is the received weather data from the API
    This function will put that data on the page
    and setting the right background image to the main box
*/
function displayData(data) {
    let city = data.name;
    let countryCode = data.sys.country;
    let temp = Math.round(data.main.temp * 10) / 10;
    let weather = data.weather[0].main;

    main.innerHTML = 
    `
    <p>${city}, ${countryCode}</p>
    <p>${temp} <span id="degree">°C</span></p>
    <p>${weather}</p>
    
    `;

    /*
        set the main box's background according 
        to the current weather
    */
    setBackgroundImage(main, `img/${weather.toLowerCase()}.jpg`);
};

/*
    This function will set the background image of the
    DOM element you specify in the first paramter
    you need an imageUrl as a second parameter.
*/
function setBackgroundImage(domElement, imageUrl) {
    domElement.style.backgroundImage = `url('${imageUrl}')`;
};

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
        If something goes wrong the geoError function will run.
    */
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    
} else {
    main.innerHTML = "geolocation IS NOT available";
}
