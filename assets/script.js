var cityName = $('#city-name')
var searchCity;
var queryURL_getCoords = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=7eef78754aaa2ca60da79139ada4f6f4&q=';
// Click listeners
$('#search-button').on('click', search)

// Search city when search button is clicked 
function search(event) {
    event.preventDefault();
    cityInput = $('#search-input').val().trim();
    if (cityInput !== '') {
        searchCity = cityInput;
        getWeather(searchCity);
    }
}

// Gets weather data when search button is clicked
function getWeather(searchCity) {
    var lat;
    var lon;
    // Gets coordinates by city name so we can make the onecall ajax call 
    $.ajax({
        url: queryURL_getCoords + searchCity,
        method: 'GET'
    }).then(function(response) {
        lat = response.coord.lat;
        lon = response.coord.lon;
        // city name
        console.log(response)
        cityName.text(response.name)
        var queryURL = 'https://api.openweathermap.org/data/2.5/onecall?units=imperial&appid=7eef78754aaa2ca60da79139ada4f6f4&lat=' + lat + '&lon=' + lon;
        // Uses coordinates from weather ajax call
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response){
            console.log(response)
            // Loop through daily array
            for (var i = 0; i < response.daily.length - 2; i++) {
                // Get time from unix time stamp and format to XX/XX/XXXX
                var unixTimeStamp = response.daily[i].dt
                var date = new Date(unixTimeStamp * 1000);
                var month = (date.getMonth() + 1).toString().padStart(2, '0');
                var day = date.getDate().toString().padStart(2, '0');
                var year = date.getFullYear();
                console.log(month + '/' + day + '/' + year);
                $('#date-0').text('(' + month + '/' + day + '/' + year + ')');
                $('#date-' + i).text(month + '/' + day + '/' + year);
                
                // Get weather icons
                var iconID = response.daily[i].weather[0].icon
                $('#weather-img-' + i).attr('src', 'http://openweathermap.org/img/wn/' + iconID + '@2x.png');
                
                // Get temperature
                var tempID = Math.floor(response.daily[i].temp.max);
                $('#temp-' + i).text(tempID + ' °F')
            }
        })
    }); 
}



