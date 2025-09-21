const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API Key from environment (secure)
const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

if (!API_KEY) {
    console.error('OPENWEATHER_API_KEY not found in environment variables');
    process.exit(1);
}

// Proxy endpoints for weather API
app.get('/api/weather', async (req, res) => {
    try {
        const { city } = req.query;
        if (!city) {
            return res.status(400).json({ error: 'City parameter is required' });
        }

        const response = await fetch(`${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`);
        
        if (!response.ok) {
            return res.status(response.status).json({ error: 'City not found' });
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Weather API error:', error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

app.get('/api/forecast', async (req, res) => {
    try {
        const { city } = req.query;
        if (!city) {
            return res.status(400).json({ error: 'City parameter is required' });
        }

        const response = await fetch(`${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`);
        
        if (!response.ok) {
            return res.status(response.status).json({ error: 'Forecast data not available' });
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Forecast API error:', error);
        res.status(500).json({ error: 'Failed to fetch forecast data' });
    }
});

// Serve the main HTML file for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Weather Dashboard server running on http://0.0.0.0:${PORT}`);
});