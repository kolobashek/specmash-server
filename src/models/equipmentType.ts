import { Model } from 'objection'

class EquipmentType extends Model {
	static get tableName() {
		return 'equipmentTypes'
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
			type: 'string',
		}
	}
}
export default EquipmentType
