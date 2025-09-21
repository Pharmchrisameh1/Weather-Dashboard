const API_KEY = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// DOM elements
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const cityName = document.getElementById('city-name');
const currentDate = document.getElementById('current-date');
const temperature = document.getElementById('temperature');
const feelsLike = document.getElementById('feels-like');
const weatherIcon = document.getElementById('weather-icon');
const weatherDescription = document.getElementById('weather-description');
const windSpeed = document.getElementById('wind-speed');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const forecastContainer = document.getElementById('forecast-container');

// Event listeners
searchButton.addEventListener('click', () => {
    const city = searchInput.value.trim();
    if (city) {
        getWeatherData(city);
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = searchInput.value.trim();
        if (city) {
            getWeatherData(city);
        }
    }
});

// Initialize with a default city
document.addEventListener('DOMContentLoaded', () => {
    getWeatherData('London');
});

// Fetch weather data from API
async function getWeatherData(city) {
    try {
        // Show loading state
        showLoading();
        
        // Fetch current weather
        const currentWeatherResponse = await fetch(
            `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        
        if (!currentWeatherResponse.ok) {
            throw new Error('City not found');
        }
        
        const currentWeatherData = await currentWeatherResponse.json();
        
        // Fetch 5-day forecast
        const forecastResponse = await fetch(
            `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`
        );
        
        if (!forecastResponse.ok) {
            throw new Error('Forecast data not available');
        }
        
        const forecastData = await forecastResponse.json();
        
        // Update UI with fetched data
        updateCurrentWeather(currentWeatherData);
        updateForecast(forecastData);
        
        // Hide loading state
        hideLoading();
        
        // Clear any previous error messages
        clearError();
    } catch (error) {
        // Hide loading state
        hideLoading();
        
        // Show error message
        showError(error.message);
        console.error('Error fetching weather data:', error);
    }
}

// Update current weather section
function updateCurrentWeather(data) {
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

// Update forecast section
function updateForecast(data) {
    // Clear previous forecast
    forecastContainer.innerHTML = '';
    
    // Get one forecast per day (at noon)
    const dailyForecasts = data.list.filter(item => {
        const date = new Date(item.dt * 1000);
        return date.getHours() === 12;
    }).slice(0, 5); // Limit to 5 days
    
    // If we don't have enough noon forecasts, just take forecasts at regular intervals
    if (dailyForecasts.length < 5) {
        dailyForecasts.length = 0;
        for (let i = 0; i < data.list.length; i += 8) { // Every 24 hours (3-hour intervals * 8)
            if (dailyForecasts.length < 5) {
                dailyForecasts.push(data.list[i]);
            }
        }
    }
    
    // Create forecast cards
    dailyForecasts.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        const iconCode = forecast.weather[0].icon;
        
        const forecastCard = document.createElement('div');
        forecastCard.classList.add('forecast-card');
        
        forecastCard.innerHTML = `
            <h3>${day}</h3>
            <img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="${forecast.weather[0].main}">
            <p class="temp">${Math.round(forecast.main.temp)}°C</p>
            <p>${forecast.weather[0].description}</p>
        `;
        
        forecastContainer.appendChild(forecastCard);
    });
}

// Helper functions for UI states
function showLoading() {
    // Clear current content
    forecastContainer.innerHTML = '';
    
    // Add loading animation
    const loadingDiv = document.createElement('div');
    loadingDiv.classList.add('loading');
    forecastContainer.appendChild(loadingDiv);
}

function hideLoading() {
    const loadingDiv = document.querySelector('.loading');
    if (loadingDiv) {
        loadingDiv.remove();
    }
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('error-message');
    errorDiv.textContent = message || 'An error occurred. Please try again.';
    
    // Insert error message after the search container
    const header = document.querySelector('header');
    header.appendChild(errorDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

function clearError() {
    const errorDiv = document.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Helper function to format date
function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    });
}