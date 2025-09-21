import { updateForecast } from '../../components/forecast/forecast.js';

describe('Forecast Component', () => {
  let mockForecastContainer;

  beforeEach(() => {
    mockForecastContainer = {
      innerHTML: '',
      appendChild: jest.fn()
    };

    document.getElementById = jest.fn((id) => {
      if (id === 'forecast-container') {
        return mockForecastContainer;
      }
      return null;
    });

    // Mock createElement
    document.createElement = jest.fn(() => ({
      className: '',
      innerHTML: '',
      appendChild: jest.fn()
    }));
  });

  it('should update forecast display with weather data', () => {
    const mockForecastData = {
      list: [
        {
          dt: 1634567890, // Mock timestamp
          main: { temp: 22 },
          weather: [{ main: 'Sunny', description: 'sunny', icon: '01d' }]
        },
        {
          dt: 1634654290, // Mock timestamp
          main: { temp: 18 },
          weather: [{ main: 'Cloudy', description: 'cloudy', icon: '02d' }]
        },
        {
          dt: 1634740690, // Mock timestamp
          main: { temp: 25 },
          weather: [{ main: 'Clear', description: 'clear', icon: '01d' }]
        }
      ]
    };

    updateForecast(mockForecastData);

    expect(mockForecastContainer.innerHTML).toBe('');
    expect(mockForecastContainer.appendChild).toHaveBeenCalled();
  });

  it('should handle empty forecast data', () => {
    const emptyForecastData = { list: [] };

    expect(() => updateForecast(emptyForecastData)).not.toThrow();
    expect(mockForecastContainer.innerHTML).toBe('');
  });

  it('should limit forecast to 5 days maximum', () => {
    const largeForecastData = {
      list: Array.from({ length: 40 }, (_, i) => ({
        dt: 1634567890 + (i * 86400), // Different days
        main: { temp: 20 + i },
        weather: [{ main: 'Test', description: 'test', icon: '01d' }]
      }))
    };

    updateForecast(largeForecastData);

    // Should only create maximum 5 forecast cards
    expect(mockForecastContainer.appendChild).toHaveBeenCalledTimes(5);
  });
});
