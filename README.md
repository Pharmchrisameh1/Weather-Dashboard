A responsive weather dashboard that displays current weather conditions and a 5-day forecast for any city. Built with HTML, CSS, and JavaScript.

## Features

- Search for weather by city name
- Display current weather conditions including:
  - Temperature and "feels like" temperature
  - Weather description with icon
  - Wind speed, humidity, and pressure
- 5-day weather forecast
- Responsive design for all device sizes
- Error handling for invalid city names or API issues

## Setup Instructions

1. Clone or download this repository
2. Sign up for a free API key at [OpenWeatherMap](https://openweathermap.org/api)
3. Open `script.js` and replace `YOUR_API_KEY` with your actual OpenWeatherMap API key
4. Open `index.html` in your browser to use the application

## API Usage

This project uses the [OpenWeatherMap API](https://openweathermap.org/api) to fetch weather data. The free tier allows up to 1,000 API calls per day, which is sufficient for personal use.

The following API endpoints are used:
- Current weather: `/weather`
- 5-day forecast: `/forecast`

## Technologies Used

- HTML5
- CSS3 (with Flexbox and Grid for layout)
- JavaScript (ES6+)
- Font Awesome for icons
- OpenWeatherMap API

## Project Structure

- `index.html` - Main HTML structure
- `styles.css` - All styling for the application
- `script.js` - JavaScript for API calls and DOM manipulation

## Future Improvements

- Add geolocation to automatically detect user's city
- Add option to switch between Celsius and Fahrenheit
- Add weather maps
- Add historical weather data
- Add weather alerts