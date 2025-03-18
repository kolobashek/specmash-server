import request from 'supertest'
import { app } from '../../../src/app'
import { setupTestDatabase, cleanupTestDatabase } from '../../helpers/dbHelper'

describe('User API', () => {
	beforeAll(async () => {
		// Настраиваем тестовую базу данных
		await setupTestDatabase()
	})

	afterAll(async () => {
		// Очищаем тестовую базу данных
		await cleanupTestDatabase()
	})

	describe('GET /api/users/:id', () => {
		it('should return 200 and user data when user exists', async () => {
			// Arrange
			const userId = 1

			// Act
			const response = await request(app)
				.get(`/api/users/${userId}`)
				.set('Accept', 'application/json')

			// Assert
			expect(response.status).toBe(200)
			expect(response.body).toHaveProperty('id', userId)
			expect(response.body).toHaveProperty('name')
			expect(response.body).toHaveProperty('email')
		})

		it('should return 404 when user does not exist', async () => {
			// Arrange
			const userId = 9999

			// Act
			const response = await request(app)
				.get(`/api/users/${userId}`)
				.set('Accept', 'application/json')

			// Assert
			expect(response.status).toBe(404)
			expect(response.body).toHaveProperty('message', 'User not found')
		})

		it('should return 400 when id is invalid', async () => {
			// Act
			const response = await request(app)
				.get('/api/users/invalid')
				.set('Accept', 'application/json')

			// Assert
			expect(response.status).toBe(400)
			expect(response.body).toHaveProperty('message')
		})
	})

	// Другие тесты для API...
})
