import { Model } from 'objection'

class Equipment extends Model {
	static get tableName() {
		return 'equipment'
	}
	static get relationMappings() {
		return {
			type: {
				relation: Model.BelongsToOneRelation,
				modelClass: Equipment,
				join: {
					from: 'equipment.type_id',
					to: 'equipment_types.id',
				},
			},
		}
	}
	static async getAll() {
		try {
			const equipments = await Equipment.query().select('*').from('equipment')
			console.log(equipments)
			return equipments
		} catch (error) {
			return new Error(error as string)
		}
	}
	static async getTypes() {
		try {
			const types = await Equipment.query().select('*').from('equipmentTypes')
			return types
		} catch (error) {
			return new Error(error as string)
		}
	}
}

export default Equipment
