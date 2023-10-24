import { GraphQLError } from 'graphql'
import { resolverPermissions } from '.'
import { Object, ObjectAttributes, ObjectAttributesInput } from '../models/object'

export const ObjectResolver = {
	Query: {
		objects: async () => {
			// получить объекты из БД
			const objects = await Object.findAll()
			return objects
		},

		object: async (parent: any, { id }: { id: number }, ctx: any) => {
			const object = await Object.findByPk(id)
			return object
		},
	},
	Mutation: {
		createObject: async (parent: any, { input }: { input: ObjectAttributesInput }, ctx: any) => {
			const userHasPermissions = await resolverPermissions(ctx, 'admin', 'manager')
			if (userHasPermissions) {
				const object = await Object.create({ ...input })
				console.log(object)
				return object
			}
			return new GraphQLError('Недостаточно прав')
		},
		updateObject: async (parent: any, { input }: { input: ObjectAttributes }, ctx: any) => {
			const userHasPermissions = await resolverPermissions(ctx, 'admin', 'manager')
			if (userHasPermissions) {
				const object = await Object.findByPk(input.id)
				if (object) {
					await object.update({ ...input })
				}
				console.log(object)
				return object
			}
			return new GraphQLError('Недостаточно прав')
		},
	},
}
