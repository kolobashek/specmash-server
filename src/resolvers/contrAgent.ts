import { resolverPermissions } from '.'
import ContrAgent, { ContrAgentAttributes, ContrAgentAttributesInput } from '../models/contrAgent'
import { GraphQLError } from 'graphql'

export const ContrAgentResolver = {
	Query: {
		contrAgents: async () => {
			// получить объекты из БД
			const contrAgents = await ContrAgent.getAll()
			return contrAgents
		},

		contrAgent: async (parent: any, { id }: { id: number }, ctx: any) => {
			// получить объекты из БД
			const contrAgents = await ContrAgent.getContrAgentById(id)
			return contrAgents
		},
	},
	Mutation: {
		createContrAgent: async (
			parent: any,
			{ input }: { input: ContrAgentAttributesInput },
			ctx: any
		) => {
			const userHasPermissions = await resolverPermissions(ctx, 'admin', 'manager')
			if (userHasPermissions) {
				const user = await ContrAgent.create(input)
				console.log(user)
				return user
			}
			return new GraphQLError('Недостаточно прав')
		},
		updateContrAgent: async (parent: any, { input }: { input: ContrAgentAttributes }, ctx: any) => {
			const userHasPermissions = await resolverPermissions(ctx, 'admin', 'manager')
			if (userHasPermissions) {
				const user = await ContrAgent.update(input)
				console.log(user)
				return user
			}
			return new GraphQLError('Недостаточно прав')
		},
	},
}
