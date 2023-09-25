import { Model } from 'objection'
import ContrAgent from './contrAgent'

class Object extends Model {
	static get tableName() {
		return 'objects'
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
			const objects = await Object.query()
			console.log('objects.getAll')
			return objects
		} catch (error) {
			return new Error(error as string)
		}
	}
	static async create(input: ObjectAttributesInput) {
		try {
			const newObject = await Object.query().insert(input)
			return newObject
		} catch (error) {
			return new Error(error as string)
		}
	}

	static async getObjectById(id: number) {
		try {
			const object = await this.query().findById(id)
			if (!object) {
				return new Error('Object not found')
			}
			return object
		} catch (error) {
			return Promise.reject(error)
		}
	}
	static async update(input: ObjectAttributes) {
		try {
			const contrAgent = await Object.query().findById(input.id)
			if (!contrAgent) {
				return new Error('Object not found')
			}
			const updatedObject = await contrAgent.$query().patchAndFetch({
				...input,
			})
			return updatedObject
		} catch (error) {
			return new Error(error as string)
		}
	}
}

export default Object

export interface ObjectAttributes extends ObjectAttributesInput {
	id: number
}
export interface ObjectAttributesInput {
	name: string
	contacts?: string
	address?: string
	contrAgents?: ContrAgent[]

	[key: string]: string | undefined | number | ContrAgent[]
}
