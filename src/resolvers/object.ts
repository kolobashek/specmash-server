import { GraphQLError } from 'graphql'
import { resolverPermissions } from '.'
import Object, { ObjectAttributes, ObjectAttributesInput } from '../models/object'

export const ObjectResolver = {
	Query: {
		objects: async () => {
			// получить объекты из БД
			const objects = await Object.getAll()
			return objects
		},

		object: async (parent: any, { id }: { id: number }, ctx: any) => {
			const object = await Object.getObjectById(id)
			return object
		},
	},
	Mutation: {
		createObject: async (parent: any, { input }: { input: ObjectAttributesInput }, ctx: any) => {
			const userHasPermissions = await resolverPermissions(ctx, 'admin', 'manager')
			if (userHasPermissions) {
				const user = await Object.create(input)
				console.log(user)
				return user
			}
			return new GraphQLError('Недостаточно прав')
		},
		updateObject: async (parent: any, { input }: { input: ObjectAttributes }, ctx: any) => {
			const userHasPermissions = await resolverPermissions(ctx, 'admin', 'manager')
			if (userHasPermissions) {
				const user = await Object.update(input)
				console.log(user)
				return user
			}
			return new GraphQLError('Недостаточно прав')
		},
	},
}
