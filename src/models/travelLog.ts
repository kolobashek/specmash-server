import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../db'
import { hash, compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
// import { knex } from '../db'
import { Role } from './role'
import logger from '../config/logger'
import { User } from './user'
import { Equipment } from './equipment'
import { Object } from './object'
import { ContrAgent } from './contrAgent'

export class TravelLog extends Model {
	declare id: number
	declare driver: number
	declare object: number
	declare equipment: number
	declare date: Date
	declare shiftNumber: number
	declare hoursWorked: number
	declare breaks: number
	declare comment: string
	// // constructor(
	// // 	id?: number,
	// // 	driver?: number,
	// // 	object?: number,
	// // 	equipment?: number,
	// // 	date?: string,
	// // 	shiftNumber?: number,
	// // 	hoursWorked?: number,
	// // 	breaks?: number,
	// // 	comment?: string
	// // ) {
	// // 	super()
	// // 	this.id = id || 0
	// // 	this.driver = driver || 0
	// // 	this.object = object || 0
	// // 	this.equipment = equipment || 0
	// // 	this.date = date || ''
	// // 	this.shiftNumber = shiftNumber || 1
	// // 	this.hoursWorked = hoursWorked || 0
	// // 	this.breaks = breaks || 0
	// // 	this.comment = comment || ''
	// // }
	// static get tableName() {
	// 	return 'travelLogs'
	// }
	// static async getAll() {
	// 	try {
	// 		return await this.query()
	// 			.withGraphFetched('driver')
	// 			.withGraphFetched('object')
	// 			.withGraphFetched('equipment')
	// 			.withGraphFetched('contrAgents')
	// 	} catch (error: any) {
	// 		logger.error(error)
	// 		return new Error(error)
	// 	}
	// }
	// static async getFiltered(filter: FilterTravelLogInput) {
	// 	const offset = ((filter.page || 1) - 1) * (filter.limit || 50)
	// 	try {
	// 		const query = this.query()
	// 			.withGraphFetched('driver')
	// 			.withGraphFetched('object')
	// 			.withGraphFetched('equipment')
	// 			.withGraphFetched('contrAgents')
	// 			.limit(filter.limit || 50)
	// 			.offset(offset)
	// 		if (filter.dateStart) {
	// 			query.where('date', '>=', filter.dateStart)
	// 		}
	// 		if (filter.dateEnd) {
	// 			query.where('date', '<=', filter.dateEnd)
	// 		}
	// 		if (filter.dateEnd && filter.dateStart) {
	// 			query.whereBetween('date', [filter.dateStart, filter.dateEnd])
	// 		}
	// 		if (filter.equipments) {
	// 			query.whereIn('equipment', filter.equipments)
	// 		}
	// 		if (filter.drivers) {
	// 			query.whereIn('driver', filter.drivers)
	// 		}
	// 		if (filter.objects) {
	// 			query.whereIn('object', filter.objects)
	// 		}
	// 		if (filter.shiftNumber) {
	// 			query.where('shiftNumber', filter.shiftNumber)
	// 		}
	// 		if (filter.comments) {
	// 			query.where('comments', 'like', `%${filter.comments}%`)
	// 		}
	// 		if (filter.contrAgents) {
	// 			query.whereIn('contrAgent', filter.contrAgents)
	// 		}
	// 		if (filter.deleted) {
	// 			query.whereNotNull('deletedAt')
	// 		}
	// 		if (filter.hoursWorkedStart) {
	// 			query.where('hoursWorked', '>=', filter.hoursWorkedStart)
	// 		}
	// 		if (filter.hoursWorkedEnd) {
	// 			query.where('hoursWorked', '<=', filter.hoursWorkedEnd)
	// 		}
	// 		if (filter.hoursWorkedStart && filter.hoursWorkedEnd) {
	// 			query.whereBetween('hoursWorked', [filter.hoursWorkedStart, filter.hoursWorkedEnd])
	// 		}
	// 		if (filter.sortBy) {
	// 			query.orderBy(filter.sortBy, filter.sortDirection || 'asc')
	// 		}
	// 		return query
	// 	} catch (error) {
	// 		logger.error(error)
	// 	}
	// }
	// static async create(data: CreateTravelLogInput) {
	// 	try {
	// 		const { date, shiftNumber, equipment, object, contrAgent, driver, ...travelLogData } = data
	// 		// Добавление умолчаний
	// 		if (!date || !shiftNumber) {
	// 			return new Error('Введите дату и смену')
	// 		}
	// 		const isTravelLogExists = await this.findByDateAndShiftAndMachine({
	// 			date,
	// 			shiftNumber,
	// 			equipment,
	// 		})
	// 		console.log('isTravelLogExists', isTravelLogExists)
	// 		if (!(isTravelLogExists instanceof Error)) {
	// 			const updateTravelLog = await this.update({
	// 				id: isTravelLogExists.id,
	// 				date,
	// 				shiftNumber,
	// 				object,
	// 				equipment,
	// 				contrAgent,
	// 				driver,
	// 				...travelLogData,
	// 			})
	// 			return updateTravelLog
	// 		} else
	// 			console.log('travelLogData', {
	// 				date,
	// 				shiftNumber,
	// 				...travelLogData,
	// 			})
	// 		// const newTraveLog = await TravelLog.query().insertGraphAndFetch(
	// 		// 	{
	// 		// 		shiftNumber,
	// 		// 		date,
	// 		// 		object,
	// 		// 		equipment,
	// 		// 		contrAgent,
	// 		// 		driver,
	// 		// 		...travelLogData,
	// 		// 	},
	// 		// 	{
	// 		// 		relate: true,
	// 		// 	}
	// 		// )
	// 		// // if (newTraveLog instanceof Error) {
	// 		// // 	return newTraveLog
	// 		// // }
	// 		// // console.log('travelLogResponse', newTraveLog)
	// 		// // if (contrAgentId) {
	// 		// // 	await newTraveLog.$relatedQuery('contrAgents').relate(contrAgentId)
	// 		// // }
	// 		// // if (driverId) {
	// 		// // 	await newTraveLog.$relatedQuery('users').relate(driverId)
	// 		// // }
	// 		// // if (objectId) {
	// 		// // 	await newTraveLog.$relatedQuery('objects').relate(objectId)
	// 		// // }
	// 		// // if (equipment) {
	// 		// // 	await newTraveLog.$relatedQuery('equipment').relate(equipment)
	// 		// // }
	// 		// console.log('travelLogResponse', newTraveLog)
	// 		// return newTraveLog
	// 	} catch (error: any) {
	// 		logger.error(error)
	// 		return new Error(error)
	// 	}
	// }
	// static async update(data: UpdateTravelLogInput) {
	// 	try {
	// 		const updatedTravelLog = await this.query().updateAndFetchById(data.id, data)
	// 		return updatedTravelLog
	// 	} catch (error: any) {
	// 		logger.error(error)
	// 		return new Error(error)
	// 	}
	// }
	// static async findByDateAndShiftAndMachine({ date, shiftNumber, equipment }: Partial<TravelLog>) {
	// 	try {
	// 		const travelLog = await this.query().where({ date, shiftNumber, equipment }).first()
	// 		if (!travelLog) {
	// 			return new Error('Путевой лист не найден')
	// 		}
	// 		return travelLog
	// 	} catch (error: any) {
	// 		console.log(error)
	// 		return new Error('Путевой лист не найден')
	// 	}
	// }
	// static get idColumn() {
	// 	return 'id'
	// }
	// static get jsonSchema() {
	// 	return {
	// 		type: 'object',
	// 		required: ['date', 'shiftNumber', 'equipmentId'],
	// 		properties: {
	// 			id: { type: 'integer' },
	// 			date: { type: 'string', minLength: 1, maxLength: 255 },
	// 			shiftNumber: { type: 'integer' },
	// 			equipmentId: { type: ['integer'] },
	// 			driverId: { type: ['integer', 'null'] },
	// 			objectId: { type: ['integer', 'null'] },
	// 			contrAgentId: { type: ['integer', 'null'] },
	// 			hoursWorked: { type: 'number' },
	// 			comments: { type: 'string', maxLength: 255 },
	// 		},
	// 	}
	// }
	// static get relationMappings() {
	// 	// const users = await User.query()
	// 	//   .withGraphFetched('role')
	// 	//   .where({ isActive: true });
	// 	return {
	// 		driver: {
	// 			relation: Model.BelongsToOneRelation,
	// 			modelClass: User,
	// 			join: {
	// 				from: 'travelLogs.driverId',
	// 				to: 'users.id',
	// 			},
	// 		},
	// 		equipment: {
	// 			relation: Model.BelongsToOneRelation,
	// 			modelClass: Equipment,
	// 			join: {
	// 				from: 'travelLogs.equipmentId',
	// 				to: 'equipment.id',
	// 			},
	// 		},
	// 		object: {
	// 			relation: Model.BelongsToOneRelation,
	// 			modelClass: Object,
	// 			join: {
	// 				from: 'travelLogs.objectId',
	// 				to: 'objects.id',
	// 			},
	// 		},
	// 		contrAgents: {
	// 			relation: Model.BelongsToOneRelation,
	// 			modelClass: ContrAgent,
	// 			join: {
	// 				from: 'objects.contrAgentId',
	// 				to: 'contrAgents.id',
	// 			},
	// 		},
	// 	}
	// }
	// // static get columnNameMappers() {
	// // 	return {
	// // 		parse: (json: any) => {
	// // 			json.equipmentId = json.equipment
	// // 			delete json.equipment
	// // 			return json
	// // 		},
	// // 		format: (json: any) => {
	// // 			json.equipment = json.equipmentId
	// // 			delete json.equipmentId
	// // 			return json
	// // 		},
	// // 	}
	// // }
}
TravelLog.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		shiftNumber: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		driverId: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		objectId: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		contrAgentId: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		equipmentId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		hoursWorked: {
			type: DataTypes.FLOAT,
			allowNull: true,
		},
		breaks: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		comment: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		modelName: 'travelLog',
		sequelize,
		paranoid: true,
	}
)
interface UpdateTravelLogInput extends CreateTravelLogInput {
	id: number
}
export interface CreateTravelLogInput {
	driver?: User
	object?: Object
	equipment: Equipment
	contrAgent?: ContrAgent
	date: string
	shiftNumber: number
	hoursWorked?: number
	breaks?: number
	comment?: string
}
interface ITravelLog extends CreateTravelLogInput {
	id: number
}

export interface CreateTravelLogPayload {
	input: CreateTravelLogInput
	// input: {
	// 	driver?: { id: number; name: string }
	// 	object?: { id: number; name: string }
	// 	equipment: { id: number; name: string }
	// 	contrAgent?: { id: number; name: string }
	// 	date: string
	// 	shiftNumber: number
	// 	hoursWorked?: number
	// 	breaks?: number
	// 	comment?: string
	// }
}
export interface UpdateTravelLogPayload {
	input: UpdateTravelLogInput
}

interface FilterTravelLogInput {
	dateStart?: string
	dateEnd?: string
	shiftNumber?: number
	equipments?: number[]
	drivers?: number[]
	objects?: number[]
	comments?: string
	contrAgents?: number[]
	deleted?: boolean
	hoursWorkedStart?: number
	hoursWorkedEnd?: number
	sortBy: keyof CreateTravelLogInput
	sortDirection: 'asc' | 'desc'
	page: number
	limit: number
}
