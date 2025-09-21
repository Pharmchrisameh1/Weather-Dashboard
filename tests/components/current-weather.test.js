import { updateCurrentWeather } from '../../components/current-weather/current-weather.js';

describe('Current Weather Component', () => {
  let mockElements;

  beforeEach(() => {
    // Mock DOM elements
    mockElements = {
      cityName: { textContent: '' },
      currentDate: { textContent: '' },
      temperature: { textContent: '' },
      feelsLike: { textContent: '' },
      weatherIcon: { src: '', alt: '' },
      weatherDescription: { textContent: '' },
      windSpeed: { textContent: '' },
      humidity: { textContent: '' },
      pressure: { textContent: '' }
    };

    // Mock document.getElementById
    document.getElementById = jest.fn((id) => {
      const elementMap = {
        'city-name': mockElements.cityName,
        'current-date': mockElements.currentDate,
        'temperature': mockElements.temperature,
        'feels-like': mockElements.feelsLike,
        'weather-icon': mockElements.weatherIcon,
        'weather-description': mockElements.weatherDescription,
        'wind-speed': mockElements.windSpeed,
        'humidity': mockElements.humidity,
        'pressure': mockElements.pressure
      };
      return elementMap[id];
    });
  });

  it('should update current weather display correctly', () => {
    const mockWeatherData = {
      name: 'London',
      sys: { country: 'GB' },
      main: {
        temp: 20.5,
        feels_like: 18.3,
        humidity: 65,
        pressure: 1013
      },
      weather: [{
        main: 'Clear',
        description: 'clear sky',
        icon: '01d'
      }],
      wind: { speed: 3.5 }
    };

    updateCurrentWeather(mockWeatherData);

    expect(mockElements.cityName.textContent).toBe('London, GB');
    expect(mockElements.temperature.textContent).toBe('21°C');
    expect(mockElements.feelsLike.textContent).toBe('Feels like: 18°C');
    expect(mockElements.weatherIcon.src).toBe('https://openweathermap.org/img/wn/01d@2x.png');
    expect(mockElements.weatherIcon.alt).toBe('Clear');
    expect(mockElements.weatherDescription.textContent).toBe('clear sky');
    expect(mockElements.windSpeed.textContent).toBe('3.5 m/s');
    expect(mockElements.humidity.textContent).toBe('65%');
    expect(mockElements.pressure.textContent).toBe('1013 hPa');
  });

  it('should handle missing weather data gracefully', () => {
    const incompleteData = {
      name: 'TestCity',
      sys: { country: 'TC' },
      main: { temp: 15 },
      weather: [{ main: 'Unknown', description: 'unknown', icon: '01d' }]
    };

    expect(() => updateCurrentWeather(incompleteData)).not.toThrow();
    expect(mockElements.cityName.textContent).toBe('TestCity, TC');
    expect(mockElements.temperature.textContent).toBe('15°C');
  });
});
