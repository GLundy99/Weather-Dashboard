var APIKey= "4a810a887073678340515af76b1c24a8";
var todaysWeather= $("#todaysWeather");
var searchBTN=$("#searchBTN");
var tempToday=$("#tempToday");
var windToday= $("#windToday");
var Humidity = $("#Humidity");
var uvIndex= $("#uvIndex");
var cityDate= $("#cityDate");
var currentDate= moment().format('L');

searchBTN.on("click", search);

// search function for user input
function search(e){
    e.preventDefault();
    var city=$("#inputCity").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    fetch(queryURL)
        .then(function(response){
            // console.log(response);
            return response.json()
        })
        .then(function(weather){
            console.log(weather);
            displayWeather(weather);
        });
};

// displays the current weather in the white box and city
function displayWeather(weather){
    cityDate.text(weather.name + " ("+ currentDate+ ")");
    tempToday.text("Temp: " + weather.main.temp + " degrees kelvin");
    windToday.text("Wind Speed: " + weather.wind.speed+ " kilometers per hour");
    Humidity.text("Humidity: "+ weather.main.humidity + " %");
    uvIndex.text("UV Index: "+ weather.sys.type);

    var lat = weather.coord.lat;
    var lon = weather.coord.lon;
    var exclude = "minutely,hourly,alerts";

    var dailyWeatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude="+exclude+"&appid="+APIKey;
    fetch(dailyWeatherURL)
        .then(function(response){
            // console.log(response);
            return response.json()
        })
        .then(function(response){
            display5DayWeather(response);
        })
}


function display5DayWeather(weather) {
    var daily = weather.daily;
    i=0
    while(i<5) {
        var w = weather.daily[i];
        var date = moment().add(i+1, 'days').calendar();
        var id = "tomorrow"+(i+1);
        var element = $("#"+id);
        var iconURL = "https://openweathermap.org/img/wn/"+w.weather[0].icon+"@2x.png";
        element.find(".card-header").text(date);
        element.find(".icon").attr("src",iconURL);
        element.find(".temp").text("Temp: " + w.temp.day + " degrees kelvin");
        element.find(".wind").text("Wind Speed: " + w.wind_speed+ " kilometers per hour");
        element.find(".humidity").text("Humidity: "+ w.humidity + " %");
        element.find(".uvindex").text("UV Index: "+ w.uvi);
        i+=1;
    }
}