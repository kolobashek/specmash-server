import { Model } from 'objection'
import Object from './contrAgent'

class ContrAgent extends Model {
	static get tableName() {
		return 'contrAgent'
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
			// const contrAgent = await ContrAgent.query()
			// 	.select(
			// 		`object.id`,
			// 		'object.name',
			// 		'dimensions',
			// 		'weight',
			// 		'licensePlate',
			// 		'nickname',
			// 		'objectTypes.name as type'
			// 	)
			// 	.leftJoin('objectTypes', 'object.typeId', 'objectTypes.id')
			// 	.from('object')
			// return contrAgent
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
