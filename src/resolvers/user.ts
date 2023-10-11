import { GraphQLError } from 'graphql'
import { resolverPermissions } from '.'
import { User, LoginInput, UserIdInput, IUser } from '../models/user'
import { Role } from '../models/role'

export const UserResolver = {
	Query: {
		users: async (parent: any, args: any, ctx: any) => {
			const userHasPermissions = await resolverPermissions(ctx, 'admin', 'manager')
			if (userHasPermissions) {
				const users = await User.findAll(args)
				return users
			}
			return []
		},

		user: async (parent: any, { id }: { id: number }, ctx: any) => {
			const userHasPermissions = await resolverPermissions(ctx, 'admin', 'manager')
			if (userHasPermissions) {
				const user = await User.findByPk(id)
				return user
			}
			return new GraphQLError('Не достаточно прав доступа')
		},

		roles: async () => {
			// получить роли из БД
			const roles = await Role.findAll()
			return roles
		},
		findByPhone: async (_: any, { phone }: { phone: string }) => {
			const user = await User.findOne({ where: { phone } })
			return user
		},
	},
	Mutation: {
		updateUser: async (parent: any, { input }: { input: Partial<IUser> }, ctx: any) => {
			const userHasPermissions = await resolverPermissions(ctx, 'admin', 'manager')
			if (userHasPermissions) {
				if (input.id) {
					const user = await User.findByPk(input.id)
					if (!user) {
						return new GraphQLError('Пользователь с данным ID не найден')
					}
					const newUser = await user.update(input)
					console.log(newUser.toJSON())
					return newUser
				} else if (input.phone) {
					const user = await User.findOne({ where: { phone: input.phone } })
					if (!user) {
						return new GraphQLError('Пользователь с данным номером телефона не найден')
					}
					const newUser = await user.update(input)
					console.log(newUser.toJSON())
					return newUser
				} else {
					return new GraphQLError('Не указан id или телефон')
				}
			}
			return new GraphQLError('Недостаточно прав')
		},
	},
}
