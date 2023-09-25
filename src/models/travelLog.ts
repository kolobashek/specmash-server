import { Model } from 'objection'
import { hash, compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { knex } from '../db'
import Role from './role'
import logger from '../config/logger'

class TravelLog extends Model implements TravelLog {
	constructor(
		id?: number,
		driver?: string,
		object?: string,
		equipment?: string,
		date?: string,
		shiftNumber?: number,
		hoursWorked?: number,
		breaks?: number,
		comment?: string
	) {
		super()
		this.id = id || 0
		this.driver = driver || ''
		this.object = object || ''
		this.equipment = equipment || ''
		this.date = date || ''
		this.shiftNumber = shiftNumber || 1
		this.hoursWorked = hoursWorked || 0
		this.breaks = breaks || 0
		this.comment = comment || ''
	}
	static async create(data: CreateTravelLogInput) {
		try {
			const { date, shiftNumber, ...travelLogData } = data
			// Добавление умолчаний
			if (!date || !shiftNumber) {
				return new Error('Введите дату и смену')
			}
			const isTravelLogExists = await this.findByDateAndShift(date, shiftNumber)
			if (isTravelLogExists instanceof TravelLog && isTravelLogExists.id) {
				const updateTravelLog = await this.update(isTravelLogExists.id, {
					date,
					shiftNumber,
					...travelLogData,
				})
				return updateTravelLog
			}
			const newTraveLog = await this.query().insert(data)
			return newTraveLog
		} catch (error: any) {
			logger.error(error)
			return new Error(error)
		}
	}
	static async update(id: number, data: CreateTravelLogInput) {
		try {
			const updatedTravelLog = await this.query().updateAndFetchById(id, data)
			return updatedTravelLog
		} catch (error: any) {
			logger.error(error)
			return new Error(error)
		}
	}
	static async findByDateAndShift(date: string, shiftNumber: number): Promise<Error | TravelLog> {
		try {
			const travelLog = await this.query().where({ date, shiftNumber }).first()
			if (!travelLog) {
				return Promise.reject(new Error('Запись не найдена'))
			}
			return travelLog
		} catch (error: any) {
			return new Error(error)
		}
	}

	static get tableName() {
		return 'travelLogs'
	}

	static get idColumn() {
		return 'id'
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: ['name', 'phone', 'password', 'role'],

			properties: {
				id: { type: 'integer' },
				name: { type: 'string', minLength: 1, maxLength: 255 },
				nickname: { type: 'string', maxLength: 255 },
				phone: { type: 'string', minLength: 3, maxLength: 25 },
				role: {
					type: 'string',
					enum: ['admin', 'manager', 'driver'],
					default: 'driver',
				},
				password: { type: 'string', minLength: 1, maxLength: 255 },
				isActive: { type: 'boolean' },
				comment: { type: 'string', maxLength: 255 },
			},
		}
	}

	static get relationMappings() {
		// const users = await User.query()
		//   .withGraphFetched('role')
		//   .where({ isActive: true });
		return {
			role: {
				relation: Model.BelongsToOneRelation,
				modelClass: Role,
				join: {
					from: 'users.roleId',
					to: 'roles.id',
				},
			},
		}
	}
}
export default TravelLog

export interface CreateTravelLogInput {
	driver?: string
	object?: string
	equipment?: string
	date: string
	shiftNumber: number
	hoursWorked?: number
	breaks?: number
	comment?: string
}
interface TravelLog extends CreateTravelLogInput {
	id: number
}

export interface CreateTravelLogPayload {
	input: CreateTravelLogInput
}
