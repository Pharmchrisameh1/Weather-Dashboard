// Mock DOM API for testing
if (typeof window === 'undefined') {
    global.window = {}
}

if (typeof document === 'undefined') {
    global.document = {
        getElementById: jest.fn().mockImplementation(id => {
            return {
                textContent: '',
                value: '',
                addEventListener: jest.fn(),
                appendChild: jest.fn(),
                innerHTML: '',
                classList: {
                    add: jest.fn(),
                    remove: jest.fn()
                },
                src: '',
                alt: ''
            };
        }),
        querySelector: jest.fn().mockImplementation(() => ({
            remove: jest.fn(),
            appendChild: jest.fn()
        })),
        createElement: jest.fn().mockImplementation(tag => ({
            classList: {
                add: jest.fn()
            },
            innerHTML: '',
            appendChild: jest.fn(),
            textContent: ''
        }))
    };
}

// Add missing functions from script.js to global scope for testing
global.getWeatherData = async function(city) {};
global.updateCurrentWeather = function(data) {};
global.updateForecast = function(data) {};
global.showLoading = function() {};
global.hideLoading = function() {};
global.showError = function(message) {};
global.clearError = function() {};
global.formatDate = function(timestamp) {};