function currentDayTime() {
  let now = new Date();
  let dateResult = document.querySelector("#date");

  let date = now.getDate();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let year = now.getFullYear();

  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let day = days[now.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];

  dateResult.innerHTML = `${day}, ${hours}:${minutes} <br /> ${date} ${month} ${year}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//========================
//Call current Time-Day
currentDayTime();

//=========================

//Display forecast

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `   
              <div class="col-2">
              <div class="weather-forecast-wrapper">
                <div class="weather-forecast-date">${formatDay(
                  forecastDay.dt
                )}</div>
                
                <img 
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="36"
                />
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max"> ${Math.round(
                    forecastDay.temp.max
                  )}° </span>
                  <span class="weather-forecast-temperature-min">${Math.round(
                    forecastDay.temp.min
                  )}° </span>
                </div>
              </div>
              </div>
            `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "a64b705a37558d573aa48063a58b50cf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//Function to display searched information

function showTemperature(response) {
  let roundedTemp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("h3");
  currentTemp.innerHTML = roundedTemp;

  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;

  let weather = document.querySelector("h4");
  weather.innerHTML = response.data.weather[0].description;

  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let wind = document.querySelector(".wind");
  wind.innerHTML = `Wind: ${response.data.wind.speed}km/h`;

  let pressure = document.querySelector(".pressure");
  pressure.innerHTML = `Pressure: ${response.data.main.pressure}`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;

  let setBackground = document.querySelector(".app");
  let changeFontColor = document.querySelector(".details");
  let changeCenterColor = document.querySelector("#center");

  if (response.data.main.temp <= 3) {
    setBackground.style.backgroundImage = `url("https://images.pexels.com/photos/3801464/pexels-photo-3801464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")`;
    setBackground.style.backgroundSize = "cover";
    changeFontColor.style.color = "rgba(245, 238, 220)";
    changeFontColor.style.opacity = "0.8";
    changeCenterColor.style.color = "rgba(245, 238, 220)";
    changeCenterColor.style.opacity = "0.8";
  } else if (response.data.main.temp <= 10) {
    setBackground.style.backgroundImage = `url("https://images.pexels.com/photos/5192874/pexels-photo-5192874.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")`;
    setBackground.style.backgroundSize = "cover";
    changeFontColor.style.color = "rgba(245, 238, 220)";
    changeFontColor.style.opacity = "0.8";
    changeCenterColor.style.color = "rgba(245, 238, 220)";
    changeCenterColor.style.opacity = "0.8";
  } else if (response.data.main.temp >= 25) {
    setBackground.style.backgroundImage = `url("https://images.pexels.com/photos/462024/pexels-photo-462024.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260")`;
    setBackground.style.backgroundSize = "cover";
    changeFontColor.style.color = "black";
    changeCenterColor.style.color = "black";
  } else if (response.data.main.temp >= 30) {
    setBackground.style.backgroundImage = `url("https://images.pexels.com/photos/998653/pexels-photo-998653.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")`;
    setBackground.style.backgroundSize = "cover";
  } else {
    setBackground.style.backgroundImage = `url("https://images.pexels.com/photos/3684396/pexels-photo-3684396.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260")`;
    setBackground.style.backgroundSize = "cover";
    changeFontColor.style.color = "black";
    changeCenterColor.style.color = "white";
  }

  getForecast(response.data.coord);
}

//get forecast

//Changing background image according to temperature

function searchCity(city) {
  //make an API call to OpenWeather API
  //Once I get the HTTP response, we display the city name and temperature
  let apiKey = "a64b705a37558d573aa48063a58b50cf";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndPoint}?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "a64b705a37558d573aa48063a58b50cf";
  let apiEndPointPosition = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrlPosition = `${apiEndPointPosition}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrlPosition).then(showTemperature);
}

//=============
//Current location

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//Global variables

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

//Default city
searchCity("Sydney");

//extras

// from snowflake css
