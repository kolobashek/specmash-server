import { GraphQLError } from 'graphql'
import { resolverPermissions } from '.'
import { TravelLog, CreateTravelLogPayload, UpdateTravelLogPayload } from '../models/travelLog'

export const TravelLogResolver = {
	Query: {
		travelLogs: async () => {
			// получить путевые листы из БД
		},
	},
	Mutation: {
		createTravelLog: async (parent: any, { input }: CreateTravelLogPayload, ctx: any) => {
			const userHasPermissions = await resolverPermissions(ctx, 'admin', 'manager')
			if (userHasPermissions) {
				const payload = {
					...input,
					// driverId: input.driver?.id,
					// equipmentId: input.equipment.id,
					// objectId: input.object?.id,
					// contrAgentId: input.contrAgent?.id,
				}
				const travelLog = await TravelLog.create(payload)
				return travelLog
			}
			return new GraphQLError('Недостаточные права доступа')
		},
		updateTravelLog: async (parent: any, { input }: UpdateTravelLogPayload, ctx: any) => {
			const userHasPermissions = await resolverPermissions(ctx, 'admin', 'manager')
			if (userHasPermissions) {
				const updatedTravelLog = await TravelLog.findByPk(input.id)
				if (updatedTravelLog) {
					const payload = {
						...input,
						// driverId: input.driver?.id,
						// equipmentId: input.equipment.id,
						// objectId: input.object?.id,
						// contrAgentId: input.contrAgent?.id,
					}
					const travelLog = await updatedTravelLog.update(payload)
					return travelLog
				}
				return updatedTravelLog
			}
			return new GraphQLError('Недостаточные права доступа')
		},
	},
}
