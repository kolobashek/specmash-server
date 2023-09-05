import { Model } from 'objection'
import ContrAgent from './contrAgent'

class Object extends Model {
	static get tableName() {
		return 'object'
	}
	static get relationMappings() {
		return {
			contrAgents: {
				relation: Model.ManyToManyRelation,
				modelClass: ContrAgent,
				join: {
					from: 'objects.id',
					through: {
						from: 'contrAgentsObjects.objectId',
						to: 'contrAgentsObjects.contrAgentId',
					},
					to: 'contrAgents.id',
				},
			},
		}
	}
	static async getAll() {
		try {
			// const objects = await Object.query()
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
			// return objects
		} catch (error) {
			return new Error(error as string)
		}
	}
	static async create(input: ObjectAttributesInput) {
		try {
			// const type = await ObjectType.getTypeByName(input.type)
			// if (type instanceof Error) {
			// 	return type
			// }
			// const newObject = await Object.query().insert({
			// 	...input,
			// 	typeId: type.id,
			// })
			// return newObject
		} catch (error) {
			return new Error(error as string)
		}
	}
}

export default Object

interface ObjectAttributes extends ObjectAttributesInput {
	id: number
}
export interface ObjectAttributesInput {
	name: string
	contacts?: string
	address?: string
	contrAgents?: ContrAgent[]

	[key: string]: string | undefined | number | ContrAgent[]
}
