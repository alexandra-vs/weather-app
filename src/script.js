function currentDayTime() {
  let now = new Date();
  let h2 = document.querySelector("h2");

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

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
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

  h2.innerHTML = `${day}, ${hours}:${minutes} <br /> ${date} ${month} ${year}`;
}

//========================
//Call current Time-Day
currentDayTime();

//=========================

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
}

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
//=============
//Calling functions

//Call search engine function
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

//Current location button
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

//Default city
searchCity("Sydney");
