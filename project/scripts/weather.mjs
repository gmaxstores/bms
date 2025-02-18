import { convertToJson, createElement, alertMessage } from "./utils.mjs";

//const path = "https://www.googleapis.com/geolocation/v1/geolocate?key=YOUR_API_KEY";
//const wUrl = "https://api.openweathermap.org/data/2.5/weather?lat=6.20&lon=6.69&appid=71a9bbafef73b11db23d820d171a062a&units=metric";


//function to change a string to title case
function titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (let i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
};

//function to fetch weather data and call displayData function
async function getWeatherData(wUrl) {
    try {
        const response = await fetch(wUrl);
        const weatherData = await convertToJson(response);
        displayData(weatherData)
    } catch (error) {
        const err = await error.message;

        //print the error to console screen
        console.log(`${error.name}: ${err}`);

        //inform user of the error
        alertMessage(`${error.name}: ${err}`);
    }
};
const weatherContainer = document.querySelector(".current-weather");
const forecastContainer = document.querySelector(".weather-forecast");
const currentLocation = document.querySelector(".current-location");

//dynamically creates and displays all elements required 
//for displaying weather info
function displayData(wData) {
    const iconSrc = `https://openweathermap.org/img/w/${wData.weather[0].icon}.png`;
    let weatherIcon = createElement("img", "weather-image");
    weatherIcon.setAttribute("src", `${iconSrc}`);
    weatherIcon.setAttribute("alt", "weather icon")
    let wTemp = document.createElement("p");
    let wDesc = document.createElement("p");
    let wHigh = document.createElement("p");
    let wLow = document.createElement("p");
    let wHumidity = document.createElement("p");
    let wSunrise = document.createElement("p");
    let wSunset = document.createElement("p");
    wTemp.innerHTML = `Temp: <span class="weather-data-values">${wData.main.temp}&deg;C</span>`;
    let desc = `${wData.weather[0].description}`;
    let upperDesc = titleCase(desc);
    wDesc.innerHTML = `Desc: <span class="weather-data-values">${upperDesc}</span>`;
    wHigh.innerHTML = `Highest Temp: <span class="weather-data-values">${wData.main.temp_max}&deg;C</span>`;
    wLow.innerHTML = `Lowest Temp: <span class="weather-data-values">${wData.main.temp_min}&deg;C</span>`;
    wHumidity.innerHTML = `Humidity: <span class="weather-data-values">${wData.main.humidity}%</span>`;
    let wSunrisee = `${wData.sys.sunrise}`;
    let wSunsett = `${wData.sys.sunset}`;
    let dateR = new Date(wSunrisee * 1000);
    let dateS = new Date(wSunsett * 1000);
    let rSunrise = dateR.toLocaleTimeString();
    let rSunset = dateS.toLocaleTimeString();
    wSunrise.innerHTML = `Sunrise: <span class="weather-data-values">${rSunrise}</span>`;
    wSunset.innerHTML = `Sunset: <span class="weather-data-values">${rSunset}</span>`;


    const loc = createElement("p", "location-state");
    loc.textContent = `${wData.name}`;

    currentLocation.insertBefore(loc, currentLocation.children[1]);
    weatherContainer.appendChild(weatherIcon);
    weatherContainer.appendChild(wTemp);
    weatherContainer.appendChild(wDesc);
    weatherContainer.appendChild(wHigh);
    weatherContainer.appendChild(wLow);
    weatherContainer.appendChild(wHumidity);
    weatherContainer.appendChild(wSunrise);
    weatherContainer.appendChild(wSunset);
};

//function to fetch forecast data and call displayforecast function
async function getWeatherForecast(fUrl) {
    try {
        const response = await fetch(fUrl);
        const forecast = await convertToJson(response);
        displayForecast(forecast);
    } catch (error) {
        const err = await error.message;

        //print the error to console screen
        console.log(`${error.name}: ${err}`);

        //inform user of the error
        alertMessage(`${error.name}: ${err}`);
    }
};

//dynamically creates and displays all elements required for displaying weather forecast
function displayForecast(wForecastt) {
    let todayForecast = document.createElement("p");
    let tomorrowForecast = document.createElement("p");
    let dayAfterTomorrowForecast = document.createElement("p");

    //converts date and time format to format common and known to majority of users
    let todayDate = `${wForecastt.list[0].dt}`;
    let tomorrowDate = `${wForecastt.list[8].dt}`;
    let dayAfterTomorrowDate = `${wForecastt.list[16].dt}`;
    let newDate = new Date(todayDate * 1000);
    let newTomDate = new Date(tomorrowDate * 1000);
    let newDayDate = new Date(dayAfterTomorrowDate * 1000);
    let rTodayDate = newDate.toDateString();
    let realTomDate = newTomDate.toDateString();
    let realDayDate = newDayDate.toDateString();
    todayForecast.innerHTML = `${rTodayDate}: <span class="weather-data-values">${wForecastt.list[0].main.temp}&deg;C</span>`;
    tomorrowForecast.innerHTML = `${realTomDate}: <span class="weather-data-values">${wForecastt.list[8].main.temp}&deg;C</span>`;
    dayAfterTomorrowForecast.innerHTML = `${realDayDate}: <span class="weather-data-values">${wForecastt.list[16].main.temp}&deg;C</span>`;

    forecastContainer.appendChild(todayForecast);
    forecastContainer.appendChild(tomorrowForecast);
    forecastContainer.appendChild(dayAfterTomorrowForecast);
};



//class that integrates all the functions
export default class Weather {
    init() {
        this.locationGetter()

    }
    //checks if the browser supports geolocation
    //and then calls setPath
    locationGetter() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setPathUrl);
            
        }
    }

    //sets the path using the users location
    //fetches the corresponding data
    setPathUrl(position) {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        const weatherUrl  = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=71a9bbafef73b11db23d820d171a062a&units=metric`;
        
        const forescatUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=71a9bbafef73b11db23d820d171a062a&units=metric`;
        getWeatherData(weatherUrl);
        getWeatherForecast(forescatUrl);
        const logi = createElement("p", "longitude");
        const lati = createElement("p", "latitude");
        logi.textContent = `Longitude: ${longitude}`;
        lati.textContent = `Latiitude: ${latitude}`
        currentLocation.appendChild(logi);
        currentLocation.appendChild(lati);
    }
}