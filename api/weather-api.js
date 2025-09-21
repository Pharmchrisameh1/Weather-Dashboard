import { API_KEY, BASE_URL } from './config.js';

// Fetch current weather data
export async function getCurrentWeather(city) {
    const response = await fetch(
        `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
        throw new Error('City not found');
    }
    
    return await response.json();
}

// Fetch forecast data
export async function getForecast(city) {
    const response = await fetch(
        `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
        throw new Error('Forecast data not available');
    }
    
    return await response.json();
}
