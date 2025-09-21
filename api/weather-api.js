import { BASE_URL } from './config.js';

// Fetch current weather data
export async function getCurrentWeather(city) {
    const response = await fetch(`${BASE_URL}/weather?city=${city}`);
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'City not found' }));
        throw new Error(errorData.error || 'City not found');
    }
    
    return await response.json();
}

// Fetch forecast data
export async function getForecast(city) {
    const response = await fetch(`${BASE_URL}/forecast?city=${city}`);
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Forecast data not available' }));
        throw new Error(errorData.error || 'Forecast data not available');
    }
    
    return await response.json();
}
