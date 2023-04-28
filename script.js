// Define a chave da API e a URL base para chamar a API do OpenWeatherMap
const apiKey = "0527d1e8f3c70206230562d177977c3b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Obtém as referências para o campo de entrada de pesquisa e o botão de pesquisa
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search a");

// Obtém a referência para o elemento da imagem do ícone do clima
const weatherIcon = document.querySelector(".weather-icon");

// Define a função async para buscar informações climáticas com base no nome da cidade
async function checkWeather(city) {
    // Chama a API do OpenWeatherMap com base na URL e na chave da API, juntamente com o nome da cidade fornecido
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    // Se a resposta da API for 404, mostra a mensagem de erro e oculta o conteúdo da previsão do tempo
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } 
    // Caso contrário, analisa a resposta da API e atualiza os elementos HTML relevantes com as informações climáticas
    else {
        var data = await response.json();

        // Atualiza o elemento HTML com a cidade em questão
        document.querySelector(".city").innerHTML = data.name;

        // Arredonda e atualiza o elemento HTML com a temperatura em graus Celsius
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";

        // Atualiza o elemento HTML com a umidade relativa do ar em porcentagem
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";

        // Atualiza o elemento HTML com a velocidade do vento em km/h
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Atualiza o ícone do clima com base na descrição do tempo
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

        // Exibe o conteúdo da previsão do tempo e oculta a mensagem de erro (se houver)
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

// Adiciona um ouvinte de eventos ao botão de pesquisa para chamar a função checkWeather() com base no valor da caixa de pesquisa
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Adiciona um ouvinte de eventos à caixa de pesquisa para permitir que o usuário pressione a tecla Enter para chamar a função checkWeather() com base no
