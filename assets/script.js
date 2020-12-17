var cityName = $('#city-name')

var apiKey = '7eef78754aaa2ca60da79139ada4f6f4';
var searchCity;
var queryURL_getCoords = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=7eef78754aaa2ca60da79139ada4f6f4&q=';
// Click listeners
$('#search-button').on('click', search)

function search(event) {
    event.preventDefault();
    cityInput = $('#search-input').val().trim();
    if (cityInput !== '') {
        searchCity = cityInput;
        getWeather(searchCity);
    }
}

// Gets coordinates by city name so we can make the onecall ajax call 
function getWeather(searchCity) {
    var lat;
    var lon;
    $.ajax({
        url: queryURL_getCoords + searchCity,
        method: 'GET'
    }).then(function(response) {
        lat = response.coord.lat;
        lon = response.coord.lon;
        // city name
        console.log(response)
        cityName.text(response.name)
        var queryURL = 'https://api.openweathermap.org/data/2.5/onecall?appid=7eef78754aaa2ca60da79139ada4f6f4&lat=' + lat + '&lon=' + lon;
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response){
            console.log(response)
            unixTimeStamp = response.current.dt
            var date = new Date(unixTimeStamp * 1000);
            var month = (date.getMonth() + 1).toString().padStart(2, '0');
            var day = date.getDate().toString().padStart(2, '0');
            var year = date.getFullYear();
            console.log(month + '/' + day + '/' + year);
        })
    }); 
}



