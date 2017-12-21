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
    main.innerHTML =
    `
    <p>Error!</p>
    <img width="75px" src="img/sad-face.svg" alt="sad face">
    `
};

/* Checking if the geolocation is supported in the browser */
if ("geolocation" in navigator) {
    main.innerHTML = 
    `
    <!-- loading animation -->
    <p>Loading</p>
    <div class="sk-cube-grid">
    <div class="sk-cube sk-cube1"></div>
    <div class="sk-cube sk-cube2"></div>
    <div class="sk-cube sk-cube3"></div>
    <div class="sk-cube sk-cube4"></div>
    <div class="sk-cube sk-cube5"></div>
    <div class="sk-cube sk-cube6"></div>
    <div class="sk-cube sk-cube7"></div>
    <div class="sk-cube sk-cube8"></div>
    <div class="sk-cube sk-cube9"></div>
    </div>
    `;
    
    /* 
        Trying to get the users position. If everything goes ok 
        the geoSuccess function will run
        If something goes wrong the geoError function will run.
    */
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    
} else {
    main.innerHTML = 
    `
    <p>Geolocation not supported</p>
    <img width="75px" src="img/sad-face.svg" alt="sad face">
    `;
}
