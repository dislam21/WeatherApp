// const searchResult = document.getElementById("searchBar"); 
// const submitSearch = document.getElementById("searchBtn");
// const cityName = document.querySelector(".display-name");
// const box1 = document.getElementById("wb1");

// const getWeatherInfo = async(location) => {
//     const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=4b120dd6457a187cd29b1725c8ef4ebf`, {mode:"cors"});
//     const weatherReport = await response.json();
//     // eslint-disable-next-line no-use-before-define
//     const weather = weatherInfo(weatherReport)
//     // eslint-disable-next-line no-use-before-define
//     displayWeather(weather)
//     console.log(weatherReport);
// }

// const weatherInfo = (weatherReport) => {
//     const currentWeather = {
//         name: weatherReport.name,
//         description: weatherReport.weather[0].description,
//         temperature: weatherReport.main.temp,
//     }
//     return currentWeather
// }

// const displayWeather = (weather) => {
//     box1.textContent = weather.description
// }

// submitSearch.addEventListener("click", () => {
//     const userLocation = searchResult.value
//     getWeatherInfo(userLocation);
//     cityName.textContent = searchResult.value.charAt(0).toUpperCase() + searchResult.value.slice(1);
// });

// // eslint-disable-next-line import/prefer-default-export
// export { getWeatherInfo }