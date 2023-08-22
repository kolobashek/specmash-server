import { Model } from 'objection'

class EquipmentType extends Model implements EquipmentType {
	constructor(id?: number, name?: string) {
		super()
		this.id = id || 0
		this.name = name || ''
	}
	static get tableName() {
		return 'equipmentTypes'
	}
	static get idColumn() {
		return 'id'
	}
	static async getTypeById(id: number) {
		try {
			const type = await this.query().findById(id)
			if (!type) {
				return new Error('Type not found')
			}
			return type
		} catch (error) {
			return Promise.reject(error)
		}
	}
	static async getTypeByName(name: string) {
		try {
			const type = await this.query().where({ name }).first()
			if (!type) {
				return new Error('Type not found')
			}
			return type
		} catch (error) {
			return Promise.reject(error)
		}
	}
	static async getAll() {
		try {
			const types = await this.query()
			return types
		} catch (error) {
			return Promise.reject(error)
		}
	}
	static get jsonSchema() {
		return {
			type: 'object',
			properties: {
				id: { type: 'integer' },
				name: { type: 'string' },
			},
		}
	}
}
export default EquipmentType

interface EquipmentType {
	id: number
	name: string
}
