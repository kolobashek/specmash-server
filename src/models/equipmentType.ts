import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../db'

export class EquipmentType extends Model {
	declare id: number
	declare name: string
	declare drivingLicenseCategory: string
	declare comment: string | null
	// constructor(id?: number, name?: string) {
	// 	super()
	// 	this.id = id || 0
	// 	this.name = name || ''
	// }
	// static get tableName() {
	// 	return 'equipmentTypes'
	// }
	// static get idColumn() {
	// 	return 'id'
	// }
	// static async getTypeById(id: number) {
	// 	try {
	// 		const type = await this.query().findById(id)
	// 		if (!type) {
	// 			return new Error('Type not found')
	// 		}
	// 		return type
	// 	} catch (error) {
	// 		return Promise.reject(error)
	// 	}
	// }
	// static async getTypeByName(name: string) {
	// 	try {
	// 		const type = await this.query().where({ name }).first()
	// 		if (!type) {
	// 			return new Error('Type not found')
	// 		}
	// 		return type
	// 	} catch (error) {
	// 		return Promise.reject(error)
	// 	}
	// }
	// static async getAll() {
	// 	try {
	// 		const types = await this.query()
	// 		return types
	// 	} catch (error) {
	// 		return Promise.reject(error)
	// 	}
	// }
	// static get jsonSchema() {
	// 	return {
	// 		type: 'object',
	// 		properties: {
	// 			id: { type: 'integer' },
	// 			name: { type: 'string' },
	// 		},
	// 	}
	// }
}

EquipmentType.init(
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
		drivingLicenseCategory: {
			type: DataTypes.STRING(10),
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
		modelName: 'equipmentType',
		sequelize,
		paranoid: true,
	}
)
