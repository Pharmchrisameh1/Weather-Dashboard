import { getCurrentWeather, getForecast } from '../api/weather-api.js';
import { updateCurrentWeather } from '../components/current-weather/current-weather.js';
import { updateForecast } from '../components/forecast/forecast.js';
import { initSearch } from '../components/search/search.js';
import { showLoading, hideLoading, showError, clearError } from './utils.js';

// Fetch weather data from API
export async function getWeatherData(city) {
    try {
        // Show loading state
        showLoading();
        
        // Fetch current weather and forecast data
        const currentWeatherData = await getCurrentWeather(city);
        const forecastData = await getForecast(city);
        
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

// Initialize the application
function initApp() {
    // Initialize search functionality
    initSearch();
    
    // Load default city
    getWeatherData('London');
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);