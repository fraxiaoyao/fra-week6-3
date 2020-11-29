//feature 1
let now = new Date();
let hour = now.getHours();
let minutes = now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let todayDate = document.querySelector("#today");
todayDate.innerHTML = `${day} ${hour}:${minutes}`;

//feature 2
function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = document.querySelector("#city");
  city.innerHTML = `${searchInput.value}`;
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

//feature 3
function checkCelsius(event) {
  event.preventDefault();
  let tempCelsius = document.querySelector("#current-temperature");
  tempCelsius.innerHTML = `+24`;
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", checkCelsius);

function checkFahr(event) {
  event.preventDefault();

  let tempFahrenheit = document.querySelector("#current-temperature");
  tempFahrenheit.innerHTML = ` 89`;
}
let fahr = document.querySelector("#fahr");
fahr.addEventListener("click", checkFahr);

//search Engine
function showTemp(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  let temp = Math.round(response.data.main.temp);
  document.querySelector("#current-temperature").innerHTML = `${temp}`;

  let humid = Math.round(response.data.main.humidity);
  document.querySelector("#hum-value").innerHTML = `${humid}%`;

  let weatherDescription = response.data.weather[0].description;
  document.querySelector("#description").innerHTML = `${weatherDescription}`;
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  let unit = "units=metric";
  let apiKey = "22ff8998ca80e7abd35b875518fa5c3c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&${unit}`;
  axios.get(apiUrl).then(showTemp);
}

let formSearch = document.querySelector("#search-form");
formSearch.addEventListener("submit", search);

let button = document.querySelector(".localize");
button.addEventListener("click", retrievePosition);

function showWeather(response) {
  let currentCity = document.querySelector(".where");
  let temperature = Math.round(response.data.main.temp);
  currentCity.innerHTML = `${response.data.name}, currently ${temperature}° C`;
}
function retrievePosition(position) {
  let apiKey = "22ff8998ca80e7abd35b875518fa5c3c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

navigator.geolocation.getCurrentPosition(retrievePosition);
