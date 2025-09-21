import { showLoading, hideLoading, showError, clearError } from '../../src/utils.js';

describe('Utils', () => {
  let mockBody, mockContainer;

  beforeEach(() => {
    mockBody = {
      classList: {
        add: jest.fn(),
        remove: jest.fn()
      }
    };

    mockContainer = {
      prepend: jest.fn()
    };

    document.body = mockBody;
    document.querySelector = jest.fn((selector) => {
      if (selector === '.container') return mockContainer;
      if (selector === '.error-message') return null;
      return null;
    });

    document.createElement = jest.fn(() => ({
      className: '',
      textContent: '',
      remove: jest.fn()
    }));

    // Mock setTimeout
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('showLoading', () => {
    it('should add loading class to body', () => {
      showLoading();
      expect(mockBody.classList.add).toHaveBeenCalledWith('loading');
    });
  });

  describe('hideLoading', () => {
    it('should remove loading class from body', () => {
      hideLoading();
      expect(mockBody.classList.remove).toHaveBeenCalledWith('loading');
    });
  });

  describe('showError', () => {
    it('should create and display error message', () => {
      const mockErrorElement = {
        className: '',
        textContent: '',
        remove: jest.fn()
      };
      
      document.createElement.mockReturnValue(mockErrorElement);
      
      showError('Test error message');
      
      expect(document.createElement).toHaveBeenCalledWith('div');
      expect(mockErrorElement.className).toBe('error-message');
      expect(mockErrorElement.textContent).toBe('Test error message');
      expect(mockContainer.prepend).toHaveBeenCalledWith(mockErrorElement);
    });

    it('should auto-remove error message after 3 seconds', () => {
      showError('Test error');
      
      // Fast-forward time
      jest.advanceTimersByTime(3000);
      
      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 3000);
    });
  });

  describe('clearError', () => {
    it('should remove existing error message', () => {
      const mockErrorElement = {
        remove: jest.fn()
      };
      
      document.querySelector = jest.fn((selector) => {
        if (selector === '.error-message') return mockErrorElement;
        return null;
      });
      
      clearError();
      
      expect(mockErrorElement.remove).toHaveBeenCalled();
    });

    it('should handle case when no error message exists', () => {
      document.querySelector = jest.fn(() => null);
      
      expect(() => clearError()).not.toThrow();
    });
  });
});
