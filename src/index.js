const searchResult = document.getElementById("searchBar"); 
const submitSearch = document.getElementById("searchBtn");
const cityName = document.querySelector(".display-name");
const mainDescription = document.querySelector(".main-description");
const mainTemp = document.querySelector(".main-temp");
const mainFeelsLike = document.querySelector(".main-feels-like");
const timeLabels = document.querySelectorAll(".time")
const weatherBoxes = document.querySelectorAll(".weather-box");

const getWeatherInfo = async(location) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=4b120dd6457a187cd29b1725c8ef4ebf`, {mode:"cors"});
    const weatherReport = await response.json();
    // eslint-disable-next-line no-use-before-define
    const weather = weatherInfo(weatherReport)
    const responseTwo = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${weatherReport.coord.lat}&lon=${weatherReport.coord.lon}&appid=4b120dd6457a187cd29b1725c8ef4ebf`, {mode:"cors"});
    const hourlyReport = await responseTwo.json();
    // eslint-disable-next-line no-use-before-define
    const hourly = hourlyInfo(hourlyReport)
    // eslint-disable-next-line no-use-before-define
    displayWeather(weather, hourly)
    console.log(weatherReport);
    console.log(hourlyReport)
}

const weatherInfo = (weatherReport) => {
    const currentWeather = {
        name: weatherReport.name,
        country: weatherReport.sys.country,
        description: weatherReport.weather[0].description,
        feelsLike: weatherReport.main.feels_like,
        temperature: weatherReport.main.temp,
    }
    console.log(currentWeather)
    return currentWeather
}

const hourlyInfo = (hourlyReport) => {
    const hourlyWeather = []
    for (let i=0; i<5; i+=1) {
        hourlyWeather[i] = {}
        hourlyWeather[i].temp = Math.round(hourlyReport.list[i].main.temp - 273);
        hourlyWeather[i].feelsLike = hourlyReport.list[i].main.feels_like
        hourlyWeather[i].description = hourlyReport.list[i].weather[0].main
    }
    console.log(hourlyWeather)
    return hourlyWeather
}

const displayWeather = (weather, hourly) => {
    const time = new Date()
    const nextTime = new Date()
    console.log(time.getTime())
    timeLabels.forEach((label, i) => {
        const timeInterval = i * 3600 * 1000;
        nextTime.setTime(time.getTime() + timeInterval)
        // eslint-disable-next-line no-param-reassign
        label.textContent = `${nextTime.getHours()}:${nextTime.getMinutes()}`;
    })

    mainDescription.textContent = weather.description.charAt(0).toUpperCase() + weather.description.slice(1);
    mainTemp.textContent = `${Math.round(weather.temperature - 273)}\u00B0 C`;
    mainFeelsLike.textContent = `Feels Like ${Math.round(weather.feelsLike - 273)}\u00B0 C`;
    cityName.textContent = `${weather.name}, ${weather.country}`;
    weatherBoxes.forEach((box, i) => {
        // eslint-disable-next-line no-param-reassign
        box.textContent = `${hourly[i].temp}\u00B0 C ${hourly[0].description}`
    });

    if (hourly[0].description === "Clear") {
        weatherBoxes.forEach((box, index) => {
            const sunImg = document.createElement("img");
            sunImg.src = "/dist/Images/Sun.jpg";
            sunImg.classList.add("box-image");
            box.appendChild(sunImg);
            console.log(index);
        });
    } else if (hourly[0].description === "Rain") {
        weatherBoxes.forEach((box, index) => {
            const rainImg = document.createElement("img");
            rainImg.src = "/dist/Images/Rain.png";
            rainImg.classList.add("box-image");
            box.appendChild(rainImg);
            console.log(index);
        });
    } else if (hourly[0].description === "Clouds") {
        weatherBoxes.forEach((box, index) => {
            const cloudsImg = document.createElement("img");
            cloudsImg.src = "/dist/Images/Clouds.png";
            cloudsImg.classList.add("box-image");
            box.appendChild(cloudsImg);
            console.log(index);
        });
    }
}

submitSearch.addEventListener("click", () => {
    const userLocation = searchResult.value
    getWeatherInfo(userLocation);
});