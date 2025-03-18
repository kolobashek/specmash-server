import { UserService } from '../../../src/services/userService'
import { UserRepository } from '../../../src/repositories/userRepository'

// Мокаем репозиторий
jest.mock('../../../src/repositories/userRepository')

describe('UserService', () => {
	let userService: UserService
	let userRepository: jest.Mocked<UserRepository>

	beforeEach(() => {
		// Очищаем все моки перед каждым тестом
		jest.clearAllMocks()

		// Создаем экземпляр мока репозитория
		userRepository = new UserRepository() as jest.Mocked<UserRepository>

		// Создаем экземпляр сервиса с моком репозитория
		userService = new UserService(userRepository)
	})

	describe('getUserById', () => {
		it('should return user when user exists', async () => {
			// Arrange
			const userId = 1
			const mockUser = { id: userId, name: 'Test User', email: 'test@example.com' }
			userRepository.findById.mockResolvedValue(mockUser)

			// Act
			const result = await userService.getUserById(userId)

			// Assert
			expect(result).toEqual(mockUser)
			expect(userRepository.findById).toHaveBeenCalledWith(userId)
			expect(userRepository.findById).toHaveBeenCalledTimes(1)
		})

		it('should return null when user does not exist', async () => {
			// Arrange
			const userId = 999
			userRepository.findById.mockResolvedValue(null)

			// Act
			const result = await userService.getUserById(userId)

			// Assert
			expect(result).toBeNull()
			expect(userRepository.findById).toHaveBeenCalledWith(userId)
		})

		it('should throw error when repository fails', async () => {
			// Arrange
			const userId = 1
			const error = new Error('Database error')
			userRepository.findById.mockRejectedValue(error)

			// Act & Assert
			await expect(userService.getUserById(userId)).rejects.toThrow('Database error')
		})
	})

	// Другие тесты для методов сервиса...
})
