import { initSearch } from '../../components/search/search.js';

// Mock the getWeatherData function
jest.mock('../../src/app.js', () => ({
  getWeatherData: jest.fn()
}));

import { getWeatherData } from '../../src/app.js';

describe('Search Component', () => {
  let mockSearchInput, mockSearchButton;

  beforeEach(() => {
    mockSearchInput = {
      value: '',
      addEventListener: jest.fn()
    };
    
    mockSearchButton = {
      addEventListener: jest.fn()
    };

    document.getElementById = jest.fn((id) => {
      if (id === 'search-input') return mockSearchInput;
      if (id === 'search-button') return mockSearchButton;
      return null;
    });

    getWeatherData.mockClear();
  });

  it('should initialize search event listeners', () => {
    initSearch();

    expect(mockSearchButton.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
    expect(mockSearchInput.addEventListener).toHaveBeenCalledWith('keypress', expect.any(Function));
  });

  it('should call getWeatherData when search button is clicked with valid city', () => {
    initSearch();
    
    // Get the click handler
    const clickHandler = mockSearchButton.addEventListener.mock.calls[0][1];
    
    mockSearchInput.value = 'London';
    clickHandler();

    expect(getWeatherData).toHaveBeenCalledWith('London');
  });

  it('should not call getWeatherData when search input is empty', () => {
    initSearch();
    
    const clickHandler = mockSearchButton.addEventListener.mock.calls[0][1];
    
    mockSearchInput.value = '   '; // Empty or whitespace
    clickHandler();

    expect(getWeatherData).not.toHaveBeenCalled();
  });

  it('should call getWeatherData when Enter key is pressed', () => {
    initSearch();
    
    const keypressHandler = mockSearchInput.addEventListener.mock.calls[0][1];
    
    mockSearchInput.value = 'Paris';
    const mockEvent = { key: 'Enter' };
    keypressHandler(mockEvent);

    expect(getWeatherData).toHaveBeenCalledWith('Paris');
  });

  it('should not call getWeatherData when other keys are pressed', () => {
    initSearch();
    
    const keypressHandler = mockSearchInput.addEventListener.mock.calls[0][1];
    
    mockSearchInput.value = 'Berlin';
    const mockEvent = { key: 'Tab' };
    keypressHandler(mockEvent);

    expect(getWeatherData).not.toHaveBeenCalled();
  });
});
