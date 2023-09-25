import { GraphQLError } from 'graphql'
import { resolverPermissions } from '.'
import User, { CreateUserInput, LoginInput, UpdateUserInput, UserIdInput } from '../models/user'
import Role from '../models/role'

export const UserResolver = {
	Query: {
		users: async (parent: any, args: any, ctx: any) => {
			const userHasPermissions = await resolverPermissions(ctx, 'admin', 'manager')
			if (userHasPermissions) {
				const users = await User.getAll()
				return users
			}
			return []
		},

		user: async (parent: any, { id }: { id: number }, ctx: any) => {
			const userHasPermissions = await resolverPermissions(ctx, 'admin', 'manager')
			if (userHasPermissions) {
				const user = await User.getUserById(id)
				return user
			}
			return new GraphQLError('Не достаточно прав доступа')
		},

		roles: async () => {
			// получить роли из БД
			const roles = await Role.getAll()
			return roles
		},
		findByPhone: async (_: any, { phone }: { phone: string }) => {
			const user = await User.query().where({ phone }).first()
			return user
		},
	},
	Mutation: {
		updateUser: async (parent: any, { input }: { input: UpdateUserInput }, ctx: any) => {
			const userHasPermissions = await resolverPermissions(ctx, 'admin', 'manager')
			if (userHasPermissions) {
				const user = await User.update(input)
				console.log(user)
				return user
			}
			return new GraphQLError('Недостаточно прав')
		},
	},
}
