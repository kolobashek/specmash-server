import { GraphQLError } from 'graphql'
import { resolverPermissions } from '.'
import TravelLog, { CreateTravelLogPayload } from '../models/travelLog'

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
				const travelLog = await TravelLog.create(input)
				return travelLog
			}
			return new GraphQLError('Недостаточные права доступа')
		},
	},
}
