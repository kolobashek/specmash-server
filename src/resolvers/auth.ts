import { GraphQLError } from 'graphql'
import { resolverPermissions } from '.'
import User, { CreateUserInput, LoginInput, UpdateUserInput, UserIdInput } from '../models/user'
import Role from '../models/role'

export const AuthResolver = {
	Query: {
		me: async (parent: any, args: any, ctx: any) => {
			// The content of the JWT can be found in the context
			const token: string = ctx.request.headers.headersInit.authorization
			if (token) {
				const user = await User.getUserByHash(token)
				if (user instanceof Error) {
					return new GraphQLError(`${user}`)
				} else if (!user) {
					return new GraphQLError('Неверный токен')
				}
				return user
			}
			console.log('token/resolvers', token)
			return new GraphQLError('Пользователь не авторизован')
		},
	},
	Mutation: {
		register: async (_: any, { input }: { input: CreateUserInput }) => {
			try {
				const user = await User.create(input)
				return user
			} catch (error: any) {
				return new GraphQLError(error.message)
			}
		},
		login: async (parent: any, { phone, password }: LoginInput, ctx: any) => {
			const token = await User.login(phone, password)
			if (token instanceof Error) {
				return new GraphQLError('Неверный телефон или пароль')
			}
			// Set the cookie on the response
			ctx.request.cookieStore?.set({
				name: 'authorization',
				sameSite: 'strict',
				secure: true,
				domain: 'specmash.su',
				expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours
				value: token,
				httpOnly: true,
			})
			return { token }
		},
		toggleUserActive: async (parent: any, { input }: UserIdInput, ctx: any) => {
			const userHasPermissions = await resolverPermissions(ctx, 'admin', 'manager')
			if (userHasPermissions) {
				const { userId } = input
				// Активация пользователя по id
				const result = await User.toggleUserActive(userId)
				return result
			}
			return new GraphQLError('Недостаточно прав')
		},
	},
}
