const apikey = "9af52a277eb3c0239d510ffa746c20a9"; // Replace with your actual API key
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="; // Base URL
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const adviceElem = document.getElementById('advice');

async function fetchWeatherData(city) {
    try {
        const response = await fetch(`${apiurl}${city}&appid=${apikey}`);
        if (!response.ok) throw new Error('Failed to fetch weather data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

function updateBackground(condition) {
    let imageUrl;

    switch (condition) {
        case 'Clear':
            imageUrl = 'https://images.pexels.com/photos/1576955/pexels-photo-1576955.jpeg?auto=compress&cs=tinysrgb&w=600';
            break;
        case 'Clouds':
            imageUrl = 'https://images.pexels.com/photos/52531/way-clouds-seat-belts-direction-52531.jpeg?auto=compress&cs=tinysrgb&w=600';
            break;
        case 'Rain':
            imageUrl = 'https://images.pexels.com/photos/125510/pexels-photo-125510.jpeg?auto=compress&cs=tinysrgb&w=600';
            break;
        case 'Snow':
            imageUrl = 'https://images.pexels.com/photos/259583/pexels-photo-259583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
            break;
        case 'Thunderstorm':
            imageUrl = 'https://images.pexels.com/photos/2409111/pexels-photo-2409111.jpeg?auto=compress&cs=tinysrgb&w=600';
            break;
        default:
            imageUrl = 'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=600';
            break;
    }

    document.body.style.backgroundImage = `url(${imageUrl})`;
}

function giveAdvice(condition) {
    let advice;

    switch (condition) {
        case 'Clear':
            advice = 'It\'s sunny outside. Enjoy your day and stay hydrated!';
            break;
        case 'Clouds':
            advice = 'It\'s cloudy. A good day for a walk, but keep an umbrella handy.';
            break;
        case 'Rain':
            advice = 'It\'s raining. Wear a raincoat and carry an umbrella.';
            break;
        case 'Snow':
            advice = 'It\'s snowing. Dress warmly and be cautious on slippery roads.';
            break;
        case 'Thunderstorm':
            advice = 'There\'s a thunderstorm. Stay indoors and avoid using electrical devices.';
            break;
        default:
            advice = 'Weather information is not available. Be prepared for any condition.';
            break;
    }

    adviceElem.textContent = advice;
}

function updateWeatherInfo(data) {
    const cityElem = document.querySelector(".city");
    const tempElem = document.querySelector(".temp");
    const humidityElem = document.querySelector(".humidity");
    const windElem = document.querySelector(".wind");

    cityElem.textContent = data.name;
    tempElem.textContent = Math.round(data.main.temp) + "°C";
    humidityElem.textContent = data.main.humidity + "%";
    windElem.textContent = data.wind.speed + " km/h";

    const condition = data.weather[0].main;

    // Update weather icon
    let iconUrl;
    switch (condition) {
        case 'Clouds':
            iconUrl = "image/clouds.png";
            break;
        case 'Clear':
            iconUrl = "image/clear.png";
            break;
        case 'Rain':
            iconUrl = "image/rain.png";
            break;
        case 'Drizzle':
            iconUrl = "image/drizzle.png";
            break;
        case 'Mist':
            iconUrl = "image/mist.png";
            break;
        case 'Snow':
            iconUrl = "image/snow.png";
            break;
        default:
            iconUrl = "image/default.png";
            break;
    }
    weatherIcon.src = iconUrl;

    // Update background and advice
    updateBackground(condition);
    giveAdvice(condition);

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
}

async function checkWeather() {
    const city = searchBox.value.trim();
    if (city) {
        const weatherData = await fetchWeatherData(city);
        if (weatherData) {
            updateWeatherInfo(weatherData);
        }
    } else {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

searchBtn.addEventListener("click", checkWeather);

// Optional: Automatically update weather info on page load or refresh
// checkWeather(); // Uncomment if you want to default to a city on page load
