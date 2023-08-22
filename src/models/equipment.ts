import { Model } from 'objection'
import EquipmentType from './equipmentType'

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
					from: 'equipment.typeId',
					to: 'equipmentTypes.id',
				},
			},
		}
	}
	static async getAll() {
		try {
			const equipments = await Equipment.query()
				.select(
					`equipment.id`,
					'equipment.name',
					'dimensions',
					'weight',
					'licensePlate',
					'nickname',
					'equipmentTypes.name as type'
				)
				.leftJoin('equipmentTypes', 'equipment.typeId', 'equipmentTypes.id')
				.from('equipment')
			return equipments
		} catch (error) {
			return new Error(error as string)
		}
	}
	static async create(input: EquipmentAttributesInput) {
		try {
			console.log(input)
			const typeId = await EquipmentType.getTypeByName(input.type)
			if (typeId instanceof Error) {
				return typeId
			}
			const { type, ...newPayload } = input
			const equipment = { typeId: typeId.id, ...newPayload }
			console.log(equipment)

			const newEquipment = await Equipment.query().insert(equipment)

			return newEquipment
		} catch (error) {
			return new Error(error as string)
		}
	}
}

export default Equipment

interface EquipmentAttributes extends EquipmentAttributesInput {
	id: number
}
export interface EquipmentAttributesInput {
	name: string
	type: string
	dimensions?: string
	weight?: number
	licensePlate?: string
	nickname?: string

	[key: string]: string | undefined | number
}
