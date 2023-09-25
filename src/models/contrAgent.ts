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

	static async getContrAgentById(id: number) {
		try {
			const contrAgent = await this.query().findById(id)
			if (!contrAgent) {
				return new Error('ContrAgent not found')
			}
			return contrAgent
		} catch (error) {
			return Promise.reject(error)
		}
	}
	static async create(input: ContrAgentAttributesInput) {
		try {
			const newContrAgent = await ContrAgent.query().insert(input)
			return newContrAgent
		} catch (error) {
			return new Error(error as string)
		}
	}
	static async update(input: ContrAgentAttributes) {
		try {
			const contrAgent = await ContrAgent.query().findById(input.id)
			if (!contrAgent) {
				return new Error('ContrAgent not found')
			}
			const updatedContrAgent = await contrAgent.$query().patchAndFetch({
				...input,
			})
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
	contrAgent?: number[]

	[key: string]: string | undefined | number | number[]
}
