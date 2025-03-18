import { UserRepository } from '../../../src/repositories/userRepository'
import { setupTestDatabase, cleanupTestDatabase } from '../../helpers/dbHelper'
import { getConnection } from '../../../src/db/connection'

describe('UserRepository', () => {
	let userRepository: UserRepository

	beforeAll(async () => {
		// Настраиваем тестовую базу данных
		await setupTestDatabase()

		// Создаем экземпляр репозитория с реальным подключением к БД
		const connection = await getConnection()
		userRepository = new UserRepository(connection)
	})

	afterAll(async () => {
		// Очищаем тестовую базу данных
		await cleanupTestDatabase()
	})

	describe('findById', () => {
		it('should return user when user exists', async () => {
			// Arrange
			const userId = 1

			// Act
			const user = await userRepository.findById(userId)

			// Assert
			expect(user).not.toBeNull()
			expect(user).toHaveProperty('id', userId)
		})

		it('should return null when user does not exist', async () => {
			// Arrange
			const userId = 9999

			// Act
			const user = await userRepository.findById(userId)

			// Assert
			expect(user).toBeNull()
		})
	})

	// Другие тесты для методов репозитория...
})
