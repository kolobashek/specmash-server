import { GraphQLError } from 'graphql'
import { resolverPermissions } from '.'
import { WorkPlace, WorkPlaceAttributes, WorkPlaceAttributesInput } from '../models/workPlace'

export const WorkPlaceResolver = {
	Query: {
		workPlaces: async () => {
			// получить объекты из БД
			const workPlaces = await WorkPlace.findAll()
			return workPlaces
		},

		workPlace: async (parent: any, { id }: { id: number }, ctx: any) => {
			const workPlace = await WorkPlace.findByPk(id)
			return workPlace
		},
	},
	Mutation: {
		createWorkPlace: async (
			parent: any,
			{ input }: { input: WorkPlaceAttributesInput },
			ctx: any
		) => {
			const userHasPermissions = await resolverPermissions(ctx, 'admin', 'manager')
			if (userHasPermissions) {
				const workPlace = await WorkPlace.create({ ...input })
				console.log(workPlace)
				return workPlace
			}
			return new GraphQLError('Недостаточно прав')
		},
		updateWorkPlace: async (parent: any, { input }: { input: WorkPlaceAttributes }, ctx: any) => {
			const userHasPermissions = await resolverPermissions(ctx, 'admin', 'manager')
			if (userHasPermissions) {
				const workPlace = await WorkPlace.findByPk(input.id)
				if (workPlace) {
					await workPlace.update({ ...input })
				}
				console.log(workPlace)
				return workPlace
			}
			return new GraphQLError('Недостаточно прав')
		},
	},
}
