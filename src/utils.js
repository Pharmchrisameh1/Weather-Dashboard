// Show loading state
export function showLoading() {
    // Add loading indicator
    document.body.classList.add('loading');
}

// Hide loading state
export function hideLoading() {
    // Remove loading indicator
    document.body.classList.remove('loading');
}

// Show error message
export function showError(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    document.querySelector('.container').prepend(errorElement);
    
    // Remove error after 3 seconds
    setTimeout(() => {
        clearError();
    }, 3000);
}

// Clear error message
export function clearError() {
    const errorElement = document.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}