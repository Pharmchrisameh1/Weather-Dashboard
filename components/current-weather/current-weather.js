// Update current weather section
export function updateCurrentWeather(data) {
    // Get DOM elements
    const cityName = document.getElementById('city-name');
    const currentDate = document.getElementById('current-date');
    const temperature = document.getElementById('temperature');
    const feelsLike = document.getElementById('feels-like');
    const weatherIcon = document.getElementById('weather-icon');
    const weatherDescription = document.getElementById('weather-description');
    const windSpeed = document.getElementById('wind-speed');
    const humidity = document.getElementById('humidity');
    const pressure = document.getElementById('pressure');
    
    // Update city name
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    
    // Update date
    const date = new Date();
    currentDate.textContent = date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Update temperature
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    feelsLike.textContent = `Feels like: ${Math.round(data.main.feels_like)}°C`;
    
    // Update weather icon and description
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.alt = data.weather[0].main;
    weatherDescription.textContent = data.weather[0].description;
    
    // Update weather details
    windSpeed.textContent = `${data.wind.speed} m/s`;
    humidity.textContent = `${data.main.humidity}%`;
    pressure.textContent = `${data.main.pressure} hPa`;
}