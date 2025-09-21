// Update forecast section
export function updateForecast(data) {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = '';
    
    // Group forecast data by day
    const dailyForecasts = groupForecastsByDay(data.list);
    
    // Create forecast cards
    dailyForecasts.forEach(forecast => {
        const forecastCard = createForecastCard(forecast);
        forecastContainer.appendChild(forecastCard);
    });
}

// Group forecast data by day
function groupForecastsByDay(forecastList) {
    const dailyForecasts = [];
    const groupedByDay = {};
    
    forecastList.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        
        if (!groupedByDay[day]) {
            groupedByDay[day] = [];
        }
        
        groupedByDay[day].push(forecast);
    });
    
    // Get the average forecast for each day
    for (const day in groupedByDay) {
        const forecasts = groupedByDay[day];
        const midDayForecast = forecasts[Math.floor(forecasts.length / 2)];
        dailyForecasts.push(midDayForecast);
    }
    
    // Limit to 5 days
    return dailyForecasts.slice(0, 5);
}

// Create a forecast card element
function createForecastCard(forecast) {
    const date = new Date(forecast.dt * 1000);
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });
    const iconCode = forecast.weather[0].icon;
    
    const card = document.createElement('div');
    card.className = 'forecast-card';
    
    card.innerHTML = `
        <h3>${day}</h3>
        <img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="${forecast.weather[0].main}">
        <p class="temp">${Math.round(forecast.main.temp)}°C</p>
        <p class="desc">${forecast.weather[0].description}</p>
    `;
    
    return card;
}
