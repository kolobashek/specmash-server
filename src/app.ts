import { createServer } from 'node:http' // Создает HTTP сервер
import { createYoga, maskError } from 'graphql-yoga' // Импорт функций из библиотеки graphql-yoga
import schema from './schema' // Импорт схемы GraphQL

const yoga = createYoga({
	// Создает инстанс GraphQL сервера
	schema, // Передает схему
	maskedErrors: {
		maskError(error, message, isDev) {
			// Функция маскировки ошибок
			console.log(error, message)
			return maskError(error, message, isDev)
		},
	},
	cors: {
		// Настройки CORS
		credentials: true,
		origin: '*',
	},
})

const server = createServer(yoga) // Создает HTTP сервер на базе инстанса GraphQL сервера

export const startServer = (port: number) => {
	// Функция запуска сервера
	server.prependListener('request', (req, res) => {
		// Добавляет обработчик запросов
		// req - объект запроса
		// res - объект ответа
		console.log(req.headers.authorization)
	})

	server.listen(port, () => {
		// Запускает сервер на указанном порту
		// port - номер порта, на котором будет запущен сервер
		console.info(`Server is running on http://localhost:${port}/graphql`)
	})
}
