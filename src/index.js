const searchInputElement = document.querySelector("#search-input");

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = searchInputElement.value;

  let city = searchInputElement.value;
  let apiKey = "019add0a90bedf4acb7o19723ceat3f3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showUser);
}

function getForcast(city) {
  let city = searchInputElement.value;
  let apiKey = "019add0a90bedf4acb7o19723ceat3f3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showUser);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateElement.innerHTML = formatDate(currentDate);

function showUser(response) {
  let currentTemp = Math.round(response.data.temperature.current);
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = `${currentTemp}`;
}

function displayForcast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forcastHtml = "";

  days.forEach(function (day) {
    forcastHtml =
      forcastHtml +
      ` 
    <div class="col-3">
    <div class="weather-icon-sml">🌤️</div>
    <div class="weather-forcast-day">${day}</div>
    <div class="weather-forcast-date">21.aug</div>
    <div class="weather-forcast-temp">
      <span class="weather-forcast-temp-max">18°</span> /
      <span class="weather-forcast-temp-min">21°</span>
    </div>
    </div>
  `;
  });

  let forcastElement = document.querySelector("#forcastWeek");
  forcastElement.innerHTML = forcastHtml;
}

displayForcast();
