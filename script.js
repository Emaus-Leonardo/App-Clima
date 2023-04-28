const apiKey = "0527d1e8f3c70206230562d177977c3b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search a");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {

        var data = await response.json();

        const cityElem = document.querySelector(".city");
        if (cityElem) {
            cityElem.innerHTML = data.name ?? "Unknown city";
        }

        const tempElem = document.querySelector(".temp");
        if (tempElem) {
            tempElem.innerHTML = Math.round(data.main?.temp) + "°c";
        }

        const humidityElem = document.querySelector(".humidity");
        if (humidityElem) {
            humidityElem.innerHTML = data.main?.humidity + "%";
        }

        const windElem = document.querySelector(".wind");
        if (windElem) {
            windElem.innerHTML = data.wind?.speed + " km/h";
        }

        if (data.weather[0].main == 'Clouds') {
            weatherIcon.src = "images/clouds.png"
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png"
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png"
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png"
        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png"
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}


searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        const searchValue = searchBox.value;
        checkWeather(searchValue);
    }
});
