/* 
written by Agoston Toth
https://github.com/DepictYourself
*/

/* 
    geoSuccess will run when we succesfully received the
    user's location. It will set the latitude and longitude
*/
function geoSuccess(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    document.getElementById('test').innerHTML = 
    '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';
};

function geoErorr() {
    //TODO handle error
};

/* Checking if the geolocation is supported in the browser */
if ("geolocation" in navigator) {
    console.log("geolocation is available");

    navigator.geolocation.getCurrentPosition(geoSuccess, geoErorr);

} else {
    console.log("geolocation IS NOT available");
}


