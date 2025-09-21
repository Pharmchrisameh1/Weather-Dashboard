# Weather Dashboard

## Overview
A responsive weather dashboard that displays current weather conditions and a 5-day forecast for any city. Built with HTML, CSS, and JavaScript using the OpenWeatherMap API.

## Project Setup (Completed)
- **Date**: September 21, 2025
- **Status**: Successfully imported from GitHub and configured for Replit
- **Frontend Server**: Running on port 5000 with CORS enabled
- **Deployment**: Configured for autoscale deployment

## Recent Changes
- Fixed file naming typos (`forcast` → `forecast`)
- Created complete HTML structure (original was incomplete)
- Fixed security vulnerability by properly configuring API key
- Updated utility functions to match HTML structure
- Configured deployment settings for production

## Project Architecture
- **Frontend**: Vanilla JavaScript with ES6 modules
- **Styling**: CSS with responsive design
- **API**: OpenWeatherMap API for weather data
- **Server**: http-server for static file serving
- **Testing**: Jest with jsdom for component testing

## Configuration
- **Port**: 5000 (frontend)
- **Host**: 0.0.0.0 (allows Replit proxy)
- **API Key**: Configured via OPENWEATHER_API_KEY environment variable
- **Deployment**: Autoscale target for production

## File Structure
```
├── api/
│   ├── config.js          # API configuration
│   ├── script.js          # Additional API utilities
│   └── weather-api.js     # Weather API functions
├── components/
│   ├── current-weather/   # Current weather display
│   ├── forecast/          # 5-day forecast
│   └── search/            # City search functionality
├── src/
│   ├── app.js            # Main application logic
│   ├── styles.css        # Main stylesheet
│   └── utils.js          # Utility functions
├── tests/                # Jest test files
├── index.html           # Main HTML file
└── package.json         # Dependencies and scripts
```

## Dependencies
- http-server: Static file server
- jest: Testing framework
- @testing-library/jest-dom: Testing utilities
- jsdom: DOM simulation for tests

## User Preferences
- Prefers clean, functional code
- Values security (removed hardcoded API keys)
- Expects working applications without placeholder data