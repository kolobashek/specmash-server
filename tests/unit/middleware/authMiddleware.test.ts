import { Request, Response } from 'express'
import { authMiddleware } from '../../../src/middleware/authMiddleware'
import { verifyToken } from '../../../src/utils/jwt'

// Мокаем функцию проверки токена
jest.mock('../../../src/utils/jwt')

describe('authMiddleware', () => {
	let mockRequest: Partial<Request>
	let mockResponse: Partial<Response>
	let nextFunction: jest.Mock

	beforeEach(() => {
		mockRequest = {
			headers: {},
		}
		mockResponse = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		}
		nextFunction = jest.fn()
	})

	it('should call next() when token is valid', () => {
		// Arrange
		const mockUser = { id: 1, name: 'Test User' }
		mockRequest.headers = {
			authorization: 'Bearer valid-token',
		}
		;(verifyToken as jest.Mock).mockReturnValue(mockUser)

		// Act
		authMiddleware(mockRequest as Request, mockResponse as Response, nextFunction)

		// Assert
		expect(verifyToken).toHaveBeenCalledWith('valid-token')
		expect(mockRequest.user).toEqual(mockUser)
		expect(nextFunction).toHaveBeenCalled()
		expect(mockResponse.status).not.toHaveBeenCalled()
	})

	it('should return 401 when no token is provided', () => {
		// Act
		authMiddleware(mockRequest as Request, mockResponse as Response, nextFunction)

		// Assert
		expect(mockResponse.status).toHaveBeenCalledWith(401)
		expect(mockResponse.json).toHaveBeenCalledWith({ message: 'No token provided' })
		expect(nextFunction).not.toHaveBeenCalled()
	})

	it('should return 401 when token is invalid', () => {
		// Arrange
		mockRequest.headers = {
			authorization: 'Bearer invalid-token',
		}
		;(verifyToken as jest.Mock).mockImplementation(() => {
			throw new Error('Invalid token')
		})

		// Act
		authMiddleware(mockRequest as Request, mockResponse as Response, nextFunction)

		// Assert
		expect(mockResponse.status).toHaveBeenCalledWith(401)
		expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid token' })
		expect(nextFunction).not.toHaveBeenCalled()
	})
})
