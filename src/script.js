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

//========================
//Call current Time-Day
currentDayTime();

//=========================

//Display forecast

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
              <div class="col-2">
                <div class="weather-forecast-date">${day}</div>
                <img
                  src="http://openweathermap.org/img/wn/10d@2x.png"
                  alt=""
                  width="36"
                />
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max">18°</span>
                  <span class="weather-forecast-temperature-min">12°</span>
                </div>
              </div>
            `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "a64b705a37558d573aa48063a58b50cf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
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

  if (response.data.main.temp <= 10) {
    setBackground.style.backgroundImage = `url("https://images.pexels.com/photos/1076885/pexels-photo-1076885.jpeg?cs=srgb&dl=pexels-invisiblepower-1076885.jpg&fm=jpg")`;
    setBackground.style.backgroundSize = "cover";
  } else if (response.data.main.temp >= 25) {
    setBackground.style.backgroundImage = `url("https://images.pexels.com/photos/62389/pexels-photo-62389.jpeg?cs=srgb&dl=pexels-life-of-pix-62389.jpg&fm=jpg")`;
    setBackground.style.backgroundSize = "cover";
  } else if (response.data.main.temp >= 35) {
    setBackground.style.backgroundImage = `url("https://images.pexels.com/photos/998657/pexels-photo-998657.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260")`;
    setBackground.style.backgroundSize = "cover;";
  } else {
    setBackground.style.backgroundImage = `url("https://images.pexels.com/photos/699422/pexels-photo-699422.jpeg?cs=srgb&dl=pexels-dapurmelodi-699422.jpg&fm=jpg")`;
    setBackground.style.backgroundSize = "cover";
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

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#search-temperature");
  //remove the active class the celsius link
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#search-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
//=============
//Calling functions

//Global variables

let celsiusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

//Default city
searchCity("Sydney");
