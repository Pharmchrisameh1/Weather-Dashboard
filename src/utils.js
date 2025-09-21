// Show loading state
export function showLoading() {
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
        loadingElement.classList.remove('hidden');
    }
}

// Hide loading state
export function hideLoading() {
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
        loadingElement.classList.add('hidden');
    }
}

// Show error message
export function showError(message) {
    const errorElement = document.getElementById('error');
    const errorMessage = document.getElementById('error-message');
    
    if (errorElement && errorMessage) {
        errorMessage.textContent = message;
        errorElement.classList.remove('hidden');
    }
    
    // Remove error after 5 seconds
    setTimeout(() => {
        clearError();
    }, 5000);
}

// Clear error message
export function clearError() {
    const errorElement = document.getElementById('error');
    if (errorElement) {
        errorElement.classList.add('hidden');
    }
}