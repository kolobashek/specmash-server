import Object from './object'
import { Model } from 'objection'

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
			const contrAgents = await ContrAgent.query().withGraphFetched('objects')

			return contrAgents
		} catch (error) {
			return new Error(error as string)
		}
	}

	static async getContrAgentById(id: number) {
		try {
			const contrAgent = await this.query().findById(id).withGraphFetched('objects')
			if (!contrAgent) {
				return new Error('ContrAgent not found')
			}
			return contrAgent
		} catch (error) {
			return Promise.reject(error)
		}
	}
	static async create(input: ContrAgentAttributesInput) {
		const { object, ...contrAgentData } = input
		try {
			const newContrAgent = await ContrAgent.query().insert(contrAgentData)
			if (object) {
				await newContrAgent.$relatedQuery('objects').relate(object)
			}
			return newContrAgent
		} catch (error) {
			return new Error(error as string)
		}
	}
	static async update(input: ContrAgentAttributes) {
		const { objects, ...contrAgentData } = input
		try {
			const contrAgent = await ContrAgent.query().findById(contrAgentData.id)
			if (!contrAgent) {
				return new Error('ContrAgent not found')
			}
			const updatedContrAgent = await ContrAgent.query().patchAndFetch({
				...contrAgentData,
			})
			if (objects) {
				await contrAgent.$relatedQuery('objects').relate(objects)
			}
			return updatedContrAgent
		} catch (error) {
			return new Error(error as string)
		}
	}
}

export default ContrAgent

export interface ContrAgentAttributes extends ContrAgentAttributesInput {
	id: number
}
export interface ContrAgentAttributesInput {
	name: string
	contacts?: string
	address?: string
	objects?: IObject[]

	[key: string]: string | undefined | number | IObject[]
}

interface IObject {
	id: number
	name: string
}
