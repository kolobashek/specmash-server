import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../db'

export class EquipmentType extends Model {
	declare id: number
	declare name: string
	declare drivingLicenseCategory: string | null
	declare comment: string | null
	static async createDefaults() {
		const defaultEquipmentTypes = [
			{
				name: 'Фронтальный погрузчик бол.',
				drivingLicenseCategory: 'Dt',
			},
			{
				name: 'Фронтальный погрузчик мал.',
				drivingLicenseCategory: 'Ct',
			},
			{
				name: 'Самосвал',
				drivingLicenseCategory: 'C',
			},
			{
				name: 'Бульдозер',
				drivingLicenseCategory: 'Et',
			},
			{
				name: 'Экскаватор гусеничный',
				drivingLicenseCategory: 'Et',
			},
			{
				name: 'Экскаватор колесный',
				drivingLicenseCategory: 'Dt',
			},
			{
				name: 'Трактор',
				drivingLicenseCategory: 'Ct',
			},
			{
				name: 'Самопогрузчик (воровайка)',
				drivingLicenseCategory: 'C',
			},
			{
				name: 'Легковой автомобиль',
				drivingLicenseCategory: 'B',
			},
			{
				name: 'Микроавтобус',
				drivingLicenseCategory: 'D',
			},
		]
		for (const eqType of defaultEquipmentTypes) {
			const [newUser] = await EquipmentType.findOrCreate({
				where: { name: eqType.name },
				defaults: eqType,
			})
		}
	}
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
	// 		type: 'workPlace',
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
			unique: true,
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
