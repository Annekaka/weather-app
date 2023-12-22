function refreshWeather(response) {
  let temperatureElement = document.querySelector("#current-temp");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#current-city");
  let timeElement = document.querySelector("#current-time");
  let iconElement = document.querySelector("#icon");
  let date = new Date(response.data.time * 1000);

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon-bg"/>`;

  getForecast(response.data.city);

  console.log(response.data);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "019add0a90bedf4acb7o19723ceat3f3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDate()];
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

function getForecast(city) {
  let apiKey = "019add0a90bedf4acb7o19723ceat3f3";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        ` 
    <div class="col-3">
    <div><img src="${day.condition.icon_url}" class="weather-icon-sml"/></div>
    <div class="weather-forecast-day">${formatDay(day.time)}</div>
    <div class="weather-forecast-temp">
      <span class="weather-forecast-temp-max"><strong>${Math.round(
        day.temperature.maximum
      )}°</strong></span> /
      <span class="weather-forecast-temp-min">${Math.round(
        day.temperature.minimum
      )}°</span>
    </div>
    </div>
  `;
    }
  });

  let forecastElement = document.querySelector("#forecastWeek");
  forecastElement.innerHTML = forecastHtml;
}
