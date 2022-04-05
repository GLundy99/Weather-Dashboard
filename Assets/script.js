$(document).ready(function () {

    // OpenWeather API Key
    var apiKey = 'ad4a8bb5eaa6384b636f4632d0256eae';

    // Handles for HTML
    var cityEl = $('h2#city');
    var dateEl = $('h3#date');
    var weatherIconEl = $('img#weather-icon');
    var temperatureEl = $('span#temp');
    var humidityEl = $('span#humid');
    var windEl = $('span#wind');
    var uvIndexEl = $('span#uvdex');
    var cityListEl = $('div.city-list');
    var cityInput = $('#city-input');

   // array to store previously searched cities
   var pastCities = [];

   
   function compare(a, b) {
       
       var cityA = a.city.toUpperCase();
       var cityB = b.city.toUpperCase();
   }

    function loadCities() {
        const storedCities = JSON.parse(localStorage.getItem('pastCities'));
        if (storedCities) {
            pastCities = storedCities;
        }
    }

    // Local Storage
    function storeCities() {
        localStorage.setItem('pastCities', JSON.stringify(pastCities));
    }

 
    function buildURLFromInputs(city) {
        if (city) {
            return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        }
    }

    function buildURLFromId(id) {
        return `https://api.openweathermap.org/data/2.5/weather?q=${city},${statecode}&appid=${apiKey}`;
    }



    function setUVColor(uvi) {
    }

     function displayCities(pastCities) {
        cityListEl.empty();
    }
    

    function searchWeather(queryURL) {

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function (response) {

            var city = response.name;
            var id = response.id;
           
            cityEl.text(response.name);
            var formattedDate = moment.unix(response.dt).format('L');
            dateEl.text(formattedDate);

            let lat = response.coord.lat;
            let lon = response.coord.lon;
            let queryURLAll = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
            $.ajax({
                url: queryURLAll,
                method: 'GET'
            }).then(function (response) {

                for (let i = 0; i <= 5; i++) {
                }
            });
        });
    }

     function displayLastSearchedCity() {
        if (pastCities[0]) {
            let queryURL = buildURLFromId(pastCities[0].id);
            searchWeather(queryURL);
        } else {
            let queryURL = buildURLFromInputs("San Antonio");
            searchWeather(queryURL);
        }
    }
 
    
    $('#search-btn').on('click', function (event) {
        event.preventDefault();

        cityInput.val('');

        if (city) {
            let queryURL = buildURLFromInputs(city);
            searchWeather(queryURL);
        }
    }); 
    
 

    loadCities();
    displayCities(pastCities);

    displayLastSearchedCity();

});
