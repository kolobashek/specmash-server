import { AuthResolver } from './auth'
import { TravelLogResolver } from './travelLogs'
import { ObjectResolver } from './object'
import { UserResolver } from './user'
import { EquipmentResolver } from './equipment'
import { ContrAgentResolver } from './contrAgent'
import logger from '../config/logger'
import { User } from '../models/user'
import { Role } from '../models/role'

export const resolverPermissions = async (ctx: any, ...resolvedRoles: string[]) => {
	const token: string = ctx.request.headers.headersInit.authorization
	if (!token) return false

	const user = await User.checkAuthByToken(token, { include: { model: Role, required: true } })

	if (!user) return false
	console.log(user.toJSON())
	// return resolvedRoles.includes(user)
}

const resolvers = {
	Query: {
		...ContrAgentResolver.Query,
		...EquipmentResolver.Query,
		...UserResolver.Query,
		...ObjectResolver.Query,
		...TravelLogResolver.Query,
		...AuthResolver.Query,
	},
	Mutation: {
		...ContrAgentResolver.Mutation,
		...EquipmentResolver.Mutation,
		...UserResolver.Mutation,
		...ObjectResolver.Mutation,
		...TravelLogResolver.Mutation,
		...AuthResolver.Mutation,
	},
}

export default resolvers
