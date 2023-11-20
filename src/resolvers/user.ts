import { GraphQLError } from 'graphql'
import { resolverPermissions } from '.'
import { User, LoginInput, UserIdInput, IUser } from '../models/user'
import { Role } from '../models/role'
import { Op } from 'sequelize'

export const UserResolver = {
	Query: {
		users: async (parent: any, { input }: any, ctx: any) => {
			const userHasPermissions = await resolverPermissions(ctx, 'admin', 'manager')
			if (userHasPermissions) {
				// console.log('---===--->')
				// console.log(input)
				// console.log('<---===---')
				const users = await User.findAll({
					...input,
					include: [
						{
							model: Role,
							as: 'roles',
						},
					],
				})
				return users
			}
			return new GraphQLError('Не достаточно прав доступа')
		},

		user: async (parent: any, { id }: { id: number }, ctx: any) => {
			const userHasPermissions = await resolverPermissions(ctx, 'admin', 'manager')
			if (userHasPermissions) {
				const user = await User.findByPk(id, {
					include: [
						{
							model: Role,
							as: 'roles',
						},
					],
				})
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
