import { getWeatherData } from '../../src/app.js';

// Initialize search functionality
export function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    
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
}