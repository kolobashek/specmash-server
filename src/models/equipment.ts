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
				modelClass: EquipmentType,
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
			const type = await EquipmentType.getTypeByName(input.type)
			if (type instanceof Error) {
				return type
			}

			const newEquipment = await Equipment.query().insert({
				...input,
				typeId: type.id,
			})

			return newEquipment
		} catch (error) {
			return new Error(error as string)
		}
	}

	static async getEquipmentById(id: number) {
		try {
			const equipment = await this.query()
				.findById(id)
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
			if (!equipment) {
				return new Error('Equipment not found')
			}
			return equipment
		} catch (error) {
			return Promise.reject(error)
		}
	}
	static async update(equipment: EquipmentAttributes) {
		try {
			const rowResult = await this.query().update(equipment).where({ id: equipment.id })
			if (rowResult > 0) {
				const newUser = await Equipment.getEquipmentById(equipment.id)
				return newUser
			}
			return new Error('Оборудование не обновлено')
		} catch (error) {
			return Promise.reject(error)
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

export type UpdateEquipmentInput = {
	id: number
	name: string
	type: string
	dimensions?: string
	weight?: number
	licensePlate?: string
	nickname?: string
}
