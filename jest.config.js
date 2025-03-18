module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	roots: ['<rootDir>/src', '<rootDir>/tests'],
	testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
	collectCoverageFrom: ['src/**/*.{js,ts}', '!src/**/*.d.ts', '!src/index.ts', '!src/config/*.ts'],
	coverageThreshold: {
		global: {
			branches: 70,
			functions: 70,
			lines: 70,
			statements: 70,
		},
	},
	setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
}
