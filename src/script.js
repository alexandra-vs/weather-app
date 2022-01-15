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

  let snowElement = document.querySelector("#snowflake");

  celsiusTemperature = response.data.main.temp;

  let setBackground = document.querySelector(".app");
  let changeFontColor = document.querySelector(".details");
  if (response.data.main.temp <= 10) {
    setBackground.style.backgroundImage = `url("https://images.pexels.com/photos/1674624/pexels-photo-1674624.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")`;
    setBackground.style.backgroundSize = "cover";
    changeFontColor.style.color = "white";
    snowElement.style.webkitAnimationPlayState = "running";
  } else if (response.data.main.temp >= 25) {
    setBackground.style.backgroundImage = `url("https://images.pexels.com/photos/673020/pexels-photo-673020.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")`;
    setBackground.style.backgroundSize = "cover";
    changeFontColor.style.color = "white";
    snowElement.style.webkitAnimationPlayState = "paused";
  } else {
    setBackground.style.backgroundImage = `url("https://images.pexels.com/photos/3684396/pexels-photo-3684396.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260")`;
    setBackground.style.backgroundSize = "cover";
    snowElement.style.webkitAnimationPlayState = "paused";
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
//Calling functions

//Global variables

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

//Default city
searchCity("Sydney");

//extras
setInterval(createSnowFlake, 300);

function createSnowFlake() {
  const snow_flake = document.createElement("i");
  snow_flake.classList.add("fas");
  snow_flake.classList.add("fa-snowflake");
  snow_flake.style.left = Math.random() * window.innerWidth + "px";
  snow_flake.style.animationDuration = Math.random() * 10 + 5 + "s";
  snow_flake.style.opacity = Math.random();
  snow_flake.style.fontSize = Math.random() * 10 + 10 + "px";

  document.body.appendChild(snow_flake);

  setTimeout(() => {
    snow_flake.remove();
  }, 5000);
}

// from snowflake css
