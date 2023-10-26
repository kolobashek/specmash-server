import { GraphQLError } from 'graphql'
import { resolverPermissions } from '.'
import { User, IUserInput, LoginInput, UserIdInput } from '../models/user'
import logger from '../config/logger'

export const AuthResolver = {
	Query: {
		me: async (parent: any, args: any, ctx: any) => {
			// The content of the JWT can be found in the context
			const token: string = ctx.request.headers.headersInit.authorization
			if (token) {
				const user = await User.checkAuthByToken(token)
				if (!user) {
					return new GraphQLError('Неверный токен')
				}
				return user
			}
			console.log('token/resolvers', token)
			return new GraphQLError('Пользователь не авторизован')
		},
	},
	Mutation: {
		register: async (_: any, { input }: { input: IUserInput }) => {
			try {
				const user = await User.create({ ...input })
				return user
			} catch (error: any) {
				return new GraphQLError(error.message)
			}
		},
		login: async (parent: any, { phone, password }: LoginInput, ctx: any) => {
			const response = await User.login({ phone, password })
			if (response instanceof Error) {
				logger.error(response.message)
				return new GraphQLError('Неверный телефон или пароль')
			}
			// Set the cookie on the response
			ctx.request.cookieStore?.set({
				name: 'authorization',
				sameSite: 'strict',
				secure: true,
				domain: 'specmash.su',
				expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours
				value: response.token,
				httpOnly: true,
			})
			return response
		},
	},
}
