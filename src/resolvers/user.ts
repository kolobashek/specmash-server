import { GraphQLError } from 'graphql'
import { resolverPermissions } from '.'
import { User, LoginInput, UserIdInput, IUser, IUserFilter } from '../models/user'
import { Role } from '../models/role'
import { Op } from 'sequelize'
import { EquipmentType } from '../models/equipmentType'

export const UserResolver = {
	Query: {
		users: async (parent: any, { input }: IUserFilter, ctx: any) => {
			const userHasPermissions = await resolverPermissions(ctx, 'admin', 'manager')
			if (userHasPermissions) {
				// console.log('---===--->')
				// console.log(input)
				// console.log('<---===---')
				const { limit, offset, search, roles, ...other } = input
				const users = await User.findAll({
					where: { ...other },
					include: [
						{
							model: Role,
							as: 'roles',
							where: {
								id: {
									[Op.or]: roles,
								},
							},
						},
						{
							model: EquipmentType,
							as: 'equipmentTypes',
							where: {
								id: {
									[Op.or]: input.equipmentTypes,
								},
							},
						},
					],
					limit,
					offset,
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
		createUser: async (parent: any, { input }: { input: Omit<IUser, 'password'> }, ctx: any) => {
			try {
				const userHasPermissions = await resolverPermissions(ctx, 'admin', 'manager')
				if (userHasPermissions) {
					const password = User.generatePassword()
					console.log(password)
					const { roles, ...other } = input
					const payload = { ...input, password }
					const user = await User.create(payload, { include: [{ model: Role, as: 'roles' }] })
					// user.setRoles(input.roles)
					console.log(user.toJSON())
					return user
				}
				return new GraphQLError('Недостаточные права доступа').toJSON()
			} catch (error: any) {
				return new GraphQLError(error.message)
			}
		},
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
