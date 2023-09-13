// Импорты
import Knex from 'knex'
import logger from './config/logger.ts'
import knexConfig from './config/knexfile'
import { Model } from 'objection'
import specmashSchema from '../dbSchema.json' assert { type: 'json' }

export const knex = Knex(knexConfig.development)

export const startDbServer = async () => {
	Model.knex(knex)
	await initDB(specmashSchema)
}

// Инициализация БД
export async function initDB(dbSchema: dbJson) {
	// Проходим по каждой таблице в схеме
	for (const tableName in dbSchema) {
		const tableSchema = dbSchema[tableName]

		// Проверяем, существует ли таблица
		const exists = await knex.schema.hasTable(tableName)

		if (!exists) {
			// Создаем таблицу
			await knex.schema.createTable(tableName, (table) => {
				// Добавляем колонки
				for (const columnName in tableSchema.columns) {
					const { type, ...options } = tableSchema.columns[columnName]
					table[type](columnName, options)
					// table.specificType(type, columnName, options)
				}

				// Добавляем индексы
				if (tableSchema.indexes) {
					for (const index of tableSchema.indexes) {
						table.index(index.columns, index.name)
					}
				}
			})
		}

		// Проверяем наличие данных по умолчанию
		if (tableSchema.data) {
			const records = tableSchema.data
			// Проверяем записи в БД
			for (const record of records) {
				const exists = await knex(tableName).where(record).first()
				// Добавляем данные
				if (!exists) {
					await knex(tableName).insert(record)
				}
			}
		}
	}
	// // Проверка и создание таблиц
	// const checkRoles = async () => {
	// 	try {
	// 		const RolesExists = await checkTableExists('roles')
	// 		if (!RolesExists) {
	// 			await knex.schema.createTable('roles', (table) => {
	// 				table.increments('id').primary()
	// 				table.string('name', 255).notNullable().unique()
	// 			})
	// 		}
	// 		const roleNames = ['admin', 'manager', 'driver', 'UNDEFINED']
	// 		for (const roleName of roleNames) {
	// 			const roleExists = await knex('roles').where({ name: roleName }).first()

	// 			if (!roleExists) {
	// 				await knex('roles').insert({
	// 					name: roleName,
	// 				})
	// 			}
	// 		}
	// 	} catch (error) {
	// 		console.error('Ошибка при создании таблицы roles:', error)
	// 	}
	// }
	// const checkUsers = async () => {
	// 	try {
	// 		const usersExists = await checkTableExists('users')

	// 		if (!usersExists) {
	// 			await knex.schema.createTable('users', (table) => {
	// 				table.increments('id').primary()
	// 				table.string('phone', 255).notNullable().unique()
	// 				table.string('password', 255).notNullable()
	// 				table.string('name', 255).notNullable()
	// 				table.string('nickname', 255)
	// 				table.string('comment', 255)
	// 				table.specificType('equipmentTypeIds', 'integer[]')
	// 				table.boolean('isActive').defaultTo(false).notNullable()
	// 				table.integer('roleId').notNullable().defaultTo(3).unsigned()
	// 				table.foreign('roleId').references('roles.id')
	// 			})
	// 		}
	// 		// Добавление пользователей по умолчанию
	// 		const users = [
	// 			{
	// 				phone: '123',
	// 				name: 'admin',
	// 				password: '$2b$10$oeG6fHl5I/oPnnTBEYPKEuEKp/Cr3MUlTRIIqLsf4Dbg3p6ZS.8iW', // 123
	// 				roleId: 1,
	// 				isActive: true,
	// 			},
	// 			{
	// 				phone: '1234',
	// 				name: 'manager',
	// 				password: '$2b$10$oeG6fHl5I/oPnnTBEYPKEuEKp/Cr3MUlTRIIqLsf4Dbg3p6ZS.8iW', // 123
	// 				roleId: 2,
	// 				isActive: true,
	// 			},
	// 			{
	// 				phone: '12345',
	// 				name: 'driver',
	// 				password: '$2b$10$oeG6fHl5I/oPnnTBEYPKEuEKp/Cr3MUlTRIIqLsf4Dbg3p6ZS.8iW', // 123
	// 				roleId: 3,
	// 				isActive: true,
	// 			},
	// 		]
	// 		for (const user of users) {
	// 			const userExists = await knex('users').where({ phone: user.phone }).first()
	// 			if (!userExists) {
	// 				await knex('users').insert(user)
	// 			}
	// 		}
	// 	} catch (error) {
	// 		console.error('Ошибка при создании таблицы users:', error)
	// 	}
	// }
	// // Проверяем наличие таблицы equipmentTypes
	// const checkEquipmentTypes = async () => {
	// 	try {
	// 		const equipmentTypesExists = await checkTableExists('equipmentTypes')
	// 		if (!equipmentTypesExists) {
	// 			await knex.schema.createTable('equipmentTypes', (table) => {
	// 				table.increments('id').primary()
	// 				table.string('name', 255).notNullable().unique()
	// 				table.boolean('deleted').defaultTo(false).notNullable()
	// 			})
	// 		}
	// 		const equipmentTypes = [
	// 			'Фронтальный погрузчик',
	// 			'Самосвал',
	// 			'Бульдозер',
	// 			'Экскаватор',
	// 			'Трактор',
	// 			'Самопогрузчик',
	// 			'Легковой автомобиль',
	// 			'Микроавтобус',
	// 		]

	// 		for (const typeName of equipmentTypes) {
	// 			const typeExists = await knex('equipmentTypes').where({ name: typeName }).first()

	// 			if (!typeExists) {
	// 				await knex('equipmentTypes').insert({
	// 					name: typeName,
	// 				})
	// 			}
	// 		}
	// 	} catch (error) {
	// 		console.error(error)
	// 	}
	// }

	// // Проверяем наличие таблицы equipment
	// const checkEquipment = async () => {
	// 	try {
	// 		const equipmentExists = await checkTableExists('equipment')

	// 		if (!equipmentExists) {
	// 			await knex.schema.createTable('equipment', (table) => {
	// 				table.increments('id').primary()
	// 				table.integer('typeId').unsigned()
	// 				table.string('name', 255).notNullable()
	// 				table.string('dimensions', 255)
	// 				table.integer('weight')
	// 				table.string('licensePlate', 255)
	// 				table.string('nickname', 255)
	// 				table.boolean('deleted').defaultTo(false).notNullable()
	// 				table.foreign('typeId').references('equipmentTypes.id')
	// 			})
	// 		}
	// 	} catch (error) {
	// 		console.error('Ошибка при создании таблицы equipment:', error)
	// 	}
	// }
	// const checkUserEquipmentTypes = async () => {
	// 	try {
	// 		const userEquipmentTypesExists = await checkTableExists('userEquipmentTypes')
	// 		if (!userEquipmentTypesExists) {
	// 			await knex.schema.createTable('userEquipmentTypes', (table) => {
	// 				table.integer('userId').unsigned()
	// 				table.foreign('userId').references('users.id')
	// 				table.integer('equipmentTypeId').unsigned()
	// 				table.foreign('equipmentTypeId').references('equipmentTypes.id')
	// 			})
	// 		}
	// 	} catch (error) {
	// 		console.error(error)
	// 	}
	// }
	// // Проверяем наличие таблицы contrAgents
	// const checkContrAgents = async () => {
	// 	try {
	// 		const contrAgentsExists = await checkTableExists('contrAgents')

	// 		if (!contrAgentsExists) {
	// 			await knex.schema.createTable('contrAgents', (table) => {
	// 				table.increments('id').primary()
	// 				table.string('name', 255).notNullable()
	// 				table.string('contacts', 255)
	// 				table.string('address', 255)
	// 				table.string('comments', 255)
	// 				table.boolean('deleted').defaultTo(false).notNullable()
	// 			})
	// 		}
	// 	} catch (error) {
	// 		console.error(error)
	// 	}
	// }
	// // Проверяем наличие таблицы objects
	// const checkObjects = async () => {
	// 	try {
	// 		const objectsExists = await checkTableExists('objects')

	// 		if (!objectsExists) {
	// 			await knex.schema.createTable('objects', (table) => {
	// 				table.increments('id').primary()
	// 				table.string('name', 255).notNullable()
	// 				table.string('contacts', 255)
	// 				table.string('address', 255)
	// 				table.boolean('deleted').defaultTo(false).notNullable()
	// 			})
	// 		}
	// 	} catch (error) {
	// 		console.error(error)
	// 	}
	// }
	// const checkContrAgentsObjects = async () => {
	// 	const tableExists = await checkTableExists('contrAgentsObjects')

	// 	if (!tableExists) {
	// 		await knex.schema.createTable('contrAgentsObjects', (table) => {
	// 			table.increments('id').primary()
	// 			table.integer('contrAgentId').unsigned()
	// 			table.integer('objectId').unsigned()

	// 			table.foreign('contrAgentId').references('contrAgents.id')
	// 			table.foreign('objectId').references('objects.id')
	// 		})
	// 	}
	// }
	// // Проверяем наличие таблицы travelLogs
	// const checkTravelLogs = async () => {
	// 	try {
	// 		const travelLogsExists = await checkTableExists('travelLogs')

	// 		if (!travelLogsExists) {
	// 			await knex.schema.createTable('travelLogs', (table) => {
	// 				table.increments('id').primary()
	// 				table.date('date')
	// 				table.integer('shiftNumber')
	// 				table.integer('userId').unsigned()
	// 				table.integer('objectId').unsigned()
	// 				table.integer('equipmentId').unsigned()
	// 				table.integer('hoursWorked')
	// 				table.integer('hoursIdle')
	// 				table.boolean('deleted').defaultTo(false).notNullable()
	// 				table.text('comments')
	// 				table.foreign('userId').references('users.id')
	// 				table.foreign('objectId').references('objects.id')
	// 				table.foreign('equipmentId').references('equipment.id')
	// 			})
	// 		}
	// 	} catch (error) {
	// 		console.error(error)
	// 	}
	// }

	// try {
	// 	await checkRoles()
	// 	await checkUsers()
	// 	await checkUserEquipmentTypes()
	// 	await checkEquipmentTypes()
	// 	await checkEquipment()
	// 	await checkContrAgents()
	// 	await checkObjects()
	// 	await checkContrAgentsObjects()
	// 	await checkTravelLogs()

	// 	logger.info('База данных успешно инициализирована')
	// } catch (error) {
	// 	console.error('Ошибка при инициализации базы данных:', error)
	// }
}

export default knex

interface dbJson {
	[key: string]: ITable
}
interface ITable {
	columns: IColumns
	foreignKeys?: any
	data?: any
	indexes?: any
}

interface IColumns {
	// id: { type: string; primary: boolean }
	[key: string]: {
		type: string
		[key: string]: any
	}
}
type CreateTableBuilder = any
