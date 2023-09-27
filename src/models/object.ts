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
			const objects = await Object.query().withGraphFetched('contrAgents')
			console.log('objects.getAll')
			return objects
		} catch (error) {
			return new Error(error as string)
		}
	}
	static async getObjectById(id: number) {
		try {
			const object = await this.query().findById(id).withGraphFetched('contrAgents')
			if (!object) {
				return new Error('Object not found')
			}
			return object
		} catch (error) {
			return Promise.reject(error)
		}
	}

	static async create(input: ObjectAttributesInput) {
		const { contrAgents, ...objectData } = input
		try {
			const newObject = await Object.query().insertAndFetch(objectData)
			if (contrAgents) {
				await newObject.$relatedQuery('contrAgents').relate(contrAgents)
			}
			return newObject
		} catch (error) {
			return new Error(error as string)
		}
	}
	static async update(input: ObjectAttributes) {
		try {
			const { contrAgents, ...objectData } = input
			const object = await Object.query().findById(objectData.id)
			if (!object) {
				return new Error('Object not found')
			}
			const updatedObject = await object.$query().patchAndFetch({
				...objectData,
			})
			if (contrAgents) {
				await object.$relatedQuery('contrAgents').relate(contrAgents)
			}
			// const updatedObject = await Object.query().upsertGraph(graphData)
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
	contrAgents?: number[]

	// [key: string]: string | undefined | number | number[]
}
