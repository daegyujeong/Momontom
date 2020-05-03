const weather = document.querySelector(".js-weather");
const weatherImg = document.querySelector(".js-weatherImg");
const API_KEY = "ec39a77387f7ac16451fbdd237c17d0f";
const COORDS = "coords";

function paintImage(iconId) {
  const image = new Image();
  image.src = `images/weather/${iconId}.png`;
  image.classList.add("weatherImage");
  weatherImg.appendChild(image);
  //   image.addEventListener("loadend", handleimgLoad);
}

function getWeather(lat, lon) {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      // API를 불러오면..
      return response.json();
    })
    .then(function (json) {
      // json을 불러왔으면..
      console.log(json);
      const temperature = json.main.temp;
      const place = json.name;
      const iconId = json.weather[0].icon;
      weather.innerText = `${temperature} @ ${place}`;
      paintImage(iconId);
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}
function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude, //latitude: latitude,
    longitude, //longitude: longitude, 랑 같은 뜻
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}
function handleGeoError() {
  console.log("Can't access");
}
function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}
function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const perseCoords = JSON.parse(loadedCoords);

    getWeather(perseCoords.latitude, perseCoords.longitude);
  }
}
function init() {
  loadCoords();
}
init();
