import logger from './config/logger'
import Role from './models/role'
import User from './models/user'
import { GraphQLError } from 'graphql'

const resolvers = {
	Query: {
		users: async () => {
			// получить пользователей из БД
			const users = await User.query()
			return users
		},

		roles: async () => {
			// получить роли из БД
			const roles = await Role.query()
			return roles
		},

		equipment: async () => {
			// получить оборудование из БД
		},

		objects: async () => {
			// получить объекты из БД
		},

		travelLogs: async () => {
			// получить путевые листы из БД
		},

		findByPhone: async (_: any, { phone }: { phone: string }) => {
			const user = await User.query().where({ phone }).first()
			return user
		},
		isActive: async (root: any, { userId }: { userId: Number }, context: any): Promise<boolean> => {
			// Получаем пользователя по id
			const result = await User.isActive(userId)
			logger.debug(JSON.stringify(result))
			// Возвращаем флаг активности
			return result
		},
		me: async (parent: any, args: any, ctx: any) => {
			// The content of the JWT can be found in the context
			const token: string = ctx.request.headers.headersInit.authorization
			// console.log(token)
			if (token) {
				const user = await User.getUserByHash(token)
				if (typeof user === 'string') {
					// console.log(user)
					return new GraphQLError(user)
				} else if (!user) {
					return new GraphQLError('Неверный токен')
				}
				// console.log(user)
				return user
			}
			console.log(token)
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
		activateUser: async (parent: any, { input }: UserIdInput) => {
			try {
				const { userId } = input
				// Активация пользователя по id
				const result = await User.activateUser(userId)
				return result
			} catch (error: any) {
				return new GraphQLError(error.message)
			}
		},
		login: async (parent: any, { phone, password }: any, ctx: any) => {
			const token = await User.login(phone, password)
			if (token instanceof Error) {
				return new GraphQLError('Invalid credentials')
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
	},
}

export default resolvers

type CreateUserInput = {
	name: string
	password: string
	phone: string
	roleId?: number
	isActive?: boolean
	nickname?: string
	comment?: string
}
type UserIdInput = {
	input: {
		userId: number
	}
}
