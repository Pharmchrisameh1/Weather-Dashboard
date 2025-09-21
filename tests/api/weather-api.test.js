import { getCurrentWeather, getForecast } from '../../api/weather-api.js';

// Mock fetch globally
global.fetch = jest.fn();

describe('Weather API', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  describe('getCurrentWeather', () => {
    it('should fetch current weather data successfully', async () => {
      const mockWeatherData = {
        name: 'London',
        sys: { country: 'GB' },
        main: {
          temp: 20,
          feels_like: 18,
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

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockWeatherData
      });

      const result = await getCurrentWeather('London');
      
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('weather?q=London&units=metric&appid=')
      );
      expect(result).toEqual(mockWeatherData);
    });

    it('should throw error when city is not found', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 404
      });

      await expect(getCurrentWeather('InvalidCity'))
        .rejects
        .toThrow('City not found');
    });

    it('should handle network errors', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(getCurrentWeather('London'))
        .rejects
        .toThrow('Network error');
    });
  });

  describe('getForecast', () => {
    it('should fetch forecast data successfully', async () => {
      const mockForecastData = {
        list: [
          {
            dt: 1634567890,
            main: { temp: 22, humidity: 60 },
            weather: [{ main: 'Sunny', description: 'sunny', icon: '01d' }]
          },
          {
            dt: 1634654290,
            main: { temp: 18, humidity: 70 },
            weather: [{ main: 'Cloudy', description: 'cloudy', icon: '02d' }]
          }
        ]
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockForecastData
      });

      const result = await getForecast('London');
      
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('forecast?q=London&units=metric&appid=')
      );
      expect(result).toEqual(mockForecastData);
    });

    it('should throw error when forecast data is not available', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 500
      });

      await expect(getForecast('London'))
        .rejects
        .toThrow('Forecast data not available');
    });
  });
});
