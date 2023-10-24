import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../db'
import { EquipmentType } from './equipmentType'

export class Equipment extends Model {
	declare id: number
	declare name: string
	declare dimensions: string
	declare weight: number
	declare licensePlate: string
	declare nickname: string
	declare typeId: number
	declare comment: string | null
	// static get tableName() {
	// 	return 'equipment'
	// }
	// static get idColumn() {
	// 	return 'id'
	// }
	// static get relationMappings() {
	// 	return {
	// 		type: {
	// 			relation: Model.BelongsToOneRelation,
	// 			modelClass: EquipmentType,
	// 			join: {
	// 				from: 'equipment.typeId',
	// 				to: 'equipmentTypes.id',
	// 			},
	// 		},
	// 	}
	// }
	// static async getAll() {
	// 	try {
	// 		const equipments = await Equipment.query()
	// 			.select(
	// 				`equipment.id`,
	// 				'equipment.name',
	// 				'dimensions',
	// 				'weight',
	// 				'licensePlate',
	// 				'nickname',
	// 				'equipmentTypes.name as type'
	// 			)
	// 			.leftJoin('equipmentTypes', 'equipment.typeId', 'equipmentTypes.id')
	// 			.from('equipment')
	// 		return equipments
	// 	} catch (error) {
	// 		return new Error(error as string)
	// 	}
	// }
	// static async create(input: EquipmentAttributesInput) {
	// 	try {
	// 		const type = await EquipmentType.getTypeByName(input.type)
	// 		if (type instanceof Error) {
	// 			return type
	// 		}
	// 		const newEquipment = await Equipment.query().insert({
	// 			...input,
	// 			typeId: type.id,
	// 		})
	// 		return newEquipment
	// 	} catch (error) {
	// 		return new Error(error as string)
	// 	}
	// }
	// static async getEquipmentById(id: number) {
	// 	try {
	// 		const equipment = await this.query()
	// 			.findById(id)
	// 			.select(
	// 				`equipment.id`,
	// 				'equipment.name',
	// 				'dimensions',
	// 				'weight',
	// 				'licensePlate',
	// 				'nickname',
	// 				'equipmentTypes.name as type'
	// 			)
	// 			.leftJoin('equipmentTypes', 'equipment.typeId', 'equipmentTypes.id')
	// 			.from('equipment')
	// 		if (!equipment) {
	// 			return new Error('Equipment not found')
	// 		}
	// 		return equipment
	// 	} catch (error) {
	// 		return Promise.reject(error)
	// 	}
	// }
	// static async update(equipment: EquipmentAttributes) {
	// 	try {
	// 		const rowResult = await this.query().update(equipment).where({ id: equipment.id })
	// 		if (rowResult > 0) {
	// 			const newUser = await Equipment.getEquipmentById(equipment.id)
	// 			return newUser
	// 		}
	// 		return new Error('Оборудование не обновлено')
	// 	} catch (error) {
	// 		return Promise.reject(error)
	// 	}
	// }
}

Equipment.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		licensePlate: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		nickname: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		weight: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: 0,
			validate: {
				min: 0,
			},
		},
		dimensions: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		typeId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		comment: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		// createdAt: {
		// 	type: DataTypes.DATE,
		// 	allowNull: false,
		// },
		// updatedAt: {
		// 	type: DataTypes.DATE,
		// 	allowNull: false,
		// },
		// deletedAt: {
		// 	type: DataTypes.DATE,
		// 	allowNull: true,
		// },
	},
	{
		modelName: 'equipment',
		sequelize,
		paranoid: true,
	}
)

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
