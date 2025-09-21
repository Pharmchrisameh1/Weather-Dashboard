module.exports = {
    testEnvironment: 'jsdom',
    testMatch: [
        '**/tests/**/*.test.js'
    ],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'script.js'
    ],
    setupFilesAfterEnv: [
        '<rootDir>/tests/setup.js'
    ]
};