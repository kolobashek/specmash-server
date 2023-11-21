import http from 'http'
import { createYoga, createSchema, YogaInitialContext } from 'graphql-yoga'
import { useCookies } from '@whatwg-node/server-plugin-cookies'
import { useGenericAuth } from '@envelop/generic-auth'
import jwt from 'jsonwebtoken'
import schema from './schema'
import { User } from './models/user'

const signingKey = process.env.JWT_SECRET || 'secret'

interface MyRequest extends Request {
	user: User
}

const yoga = createYoga({
	schema,
	context: async (yoga: YogaInitialContext) => {
		const req = yoga.request as MyRequest
		req.user
	},
	cors: {
		credentials: true,
		origin: '*',
	},
	plugins: [
		useCookies(),
		// useGenericAuth({
		// 	mode: 'protect-granular',
		// 	async resolveUserFn(context: YogaInitialContext) {
		// 		let accessToken = (context.request.headers as any).authorization ?? null
		// 		if (accessToken === null) {
		// 			return null
		// 		}
		// 		const token = accessToken.split(' ')[1]
		// 		try {
		// 			const user = jwt.verify(token, signingKey)
		// 			// Добавляем данные пользователя в объект запроса
		// 			return user ?? null
		// 		} catch (error) {
		// 			return null
		// 		}
		// 	},
		// }),
	],
	// graphiql(request) {
	//   if (request.headers.get('graphiql-enabled')) {
	//     return true
	//   }
	//   return false
	// },
})
const server = http.createServer(yoga)

export function startServer(port: number) {
	server.prependListener('request', (req, res) => {
		console.log(req.headers.authorization)
	})
	server.listen(port, () => {
		console.info(`Server is running on http://localhost:${port}/graphql`)
	})
}
