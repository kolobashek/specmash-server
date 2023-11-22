// import http from 'http'
import { createServer } from 'node:http'
import { createYoga, maskError } from 'graphql-yoga'
import schema from './schema'

const yoga = createYoga({
	schema,
	maskedErrors: {
		maskError(error, message, isDev) {
			console.log(error, message)
			return maskError(error, message, isDev)
		},
	},
	cors: {
		credentials: true,
		origin: '*',
	},
})
const server = createServer(yoga)

export const startServer = (port: number) => {
	server.prependListener('request', (req, res) => {
		console.log(req.headers.authorization)
	})
	server.listen(port, () => {
		console.info(`Server is running on http://localhost:${port}/graphql`)
	})
}
