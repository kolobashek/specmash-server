import logger from './config/logger'
import Equipment, { EquipmentAttributesInput } from './models/equipment'
import EquipmentType from './models/equipmentType'
import Role from './models/role'
import TravelLog, { CreateTravelLogInput } from './models/travelLog'
import User from './models/user'
import { GraphQLError } from 'graphql'

const resolverPermissions = async (ctx: any, ...resolvedRoles: string[]) => {
	const token: string = ctx.request.headers.headersInit.authorization
	if (!token) return false

	const user = await User.getUserByHash(token)

	if (user instanceof Error) return false

	return resolvedRoles.includes(user.role)
}

const resolvers = {
	Query: {
		users: async (parent: any, args: any, ctx: any) => {
			const userHasPermissions = await resolverPermissions(ctx, 'admin', 'manager')
			if (userHasPermissions) {
				const users = await User.getAll()
				return users
			}
			return []
		},

		roles: async () => {
			// получить роли из БД
			const roles = await Role.getAll()
			return roles
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

		// isActive: async (root: any, { userId }: { userId: Number }, context: any): Promise<boolean> => {
		// 	// Получаем пользователя по id
		// 	const result = await User.isActive(userId)
		// 	logger.debug(JSON.stringify(result))
		// 	// Возвращаем флаг активности
		// 	return result
		// },

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
		getEquipmentTypes: async () => {
			const types = await EquipmentType.getAll()
			return types
		},
		equipments: async () => {
			const equipments = await Equipment.getAll()
			return equipments
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
		toggleUserActive: async (parent: any, { input }: UserIdInput, ctx: any) => {
			const userHasPermissions = await resolverPermissions(ctx, 'admin', 'manager')
			if (userHasPermissions) {
				const { userId } = input
				// Активация пользователя по id
				const result = await User.toggleUserActive(userId)
				return result
			}
			return new GraphQLError('Недостаточные права доступа')
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
		createTravelLog: async (parent: any, { input }: CreateTravelLogPayload, ctx: any) => {
			const userHasPermissions = await resolverPermissions(ctx, 'admin', 'manager')
			if (userHasPermissions) {
				const travelLog = await TravelLog.create(input)
				return travelLog
			}
			return new GraphQLError('Недостаточные права доступа')
		},
		createEquipment: async (parent: any, input: EquipmentAttributesInput, ctx: any) => {
			const userHasPermissions = await resolverPermissions(ctx, 'admin', 'manager')
			if (userHasPermissions) {
				console.log('input', input)
				const newEquipment = await Equipment.create(input)
				return newEquipment
			}
			return new GraphQLError('Недостаточные права доступа')
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
interface LoginInput {
	phone: string
	password: string
}
interface CreateEquipmentPayload {
	input: EquipmentAttributesInput
}
interface CreateTravelLogPayload {
	input: CreateTravelLogInput
}
