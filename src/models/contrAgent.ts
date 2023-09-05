import { Model } from 'objection'
import Object from './contrAgent'

class ContrAgent extends Model {
	static get tableName() {
		return 'contrAgents'
	}
	static get relationMappings() {
		return {
			objects: {
				relation: Model.ManyToManyRelation,
				modelClass: Object,
				join: {
					from: 'contrAgents.id',
					through: {
						from: 'contrAgentsObjects.contrAgentId',
						to: 'contrAgentsObjects.objectId',
					},
					to: 'objects.id',
				},
			},
		}
	}
	static async getAll() {
		try {
			const contrAgents = await ContrAgent.query()
			return contrAgents
		} catch (error) {
			return new Error(error as string)
		}
	}
	static async create(input: ContrAgentAttributesInput) {
		try {
			// const type = await ContrAgentType.getTypeByName(input.type)
			// if (type instanceof Error) {
			// 	return type
			// }
			// const newContrAgent = await ContrAgent.query().insert({
			// 	...input,
			// 	typeId: type.id,
			// })
			// return newContrAgent
		} catch (error) {
			return new Error(error as string)
		}
	}
}

export default ContrAgent

interface ContrAgentAttributes extends ContrAgentAttributesInput {
	id: number
}
export interface ContrAgentAttributesInput {
	name: string
	contacts?: string
	address?: string
	contrAgent?: Object[]

	[key: string]: string | undefined | number | Object[]
}
