// Импорты
import Knex from 'knex'
import logger from './config/logger.ts'
import knexConfig from './config/knexfile'
import { Model } from 'objection'

export const knex = Knex(knexConfig.development)

export const startDbServer = async () => {
	Model.knex(knex)
	await initDB()
}

// Инициализация БД
export async function initDB() {
	// Проверка и создание таблиц
	const checkRoles = async () => {
		try {
			const RolesExists = await knex.schema.hasTable('roles')
			if (!RolesExists) {
				await knex.schema.createTable('roles', (table) => {
					table.increments('id').primary()
					table.string('name', 255).notNullable().unique()
				})
			}
			const roleNames = ['admin', 'manager', 'driver', 'UNDEFINED']
			for (const roleName of roleNames) {
				const roleExists = await knex('roles').where({ name: roleName }).first()

				if (!roleExists) {
					await knex('roles').insert({
						name: roleName,
					})
				}
			}
		} catch (error) {
			console.error('Ошибка при создании таблицы roles:', error)
		}
	}
	const checkUsers = async () => {
		try {
			const usersExists = await knex.schema.hasTable('users')

			if (!usersExists) {
				await knex.schema.createTable('users', (table) => {
					table.increments('id').primary()
					table.string('phone', 255).notNullable().unique()
					table.string('password', 255).notNullable()
					table.string('name', 255).notNullable()
					table.string('nickname', 255)
					table.string('comment', 255)
					table.specificType('equipmentTypeIds', 'integer[]')
					table.boolean('isActive').defaultTo(false).notNullable()
					table.integer('roleId').notNullable().defaultTo(3).unsigned()
					table.foreign('roleId').references('roles.id')
				})
				// Добавление пользователей по умолчанию
			}
			const users = [
				{
					phone: '123',
					name: 'admin',
					password: '$2b$10$oeG6fHl5I/oPnnTBEYPKEuEKp/Cr3MUlTRIIqLsf4Dbg3p6ZS.8iW', // 123
					roleId: 1,
					isActive: true,
				},
				{
					phone: '1234',
					name: 'manager',
					password: '$2b$10$oeG6fHl5I/oPnnTBEYPKEuEKp/Cr3MUlTRIIqLsf4Dbg3p6ZS.8iW', // 123
					roleId: 2,
					isActive: true,
				},
				{
					phone: '12345',
					name: 'driver',
					password: '$2b$10$oeG6fHl5I/oPnnTBEYPKEuEKp/Cr3MUlTRIIqLsf4Dbg3p6ZS.8iW', // 123
					roleId: 3,
					isActive: true,
				},
			]
			for (const user of users) {
				const userExists = await knex('users').where({ phone: user.phone }).first()
				if (!userExists) {
					await knex('users').insert(user)
				}
			}
		} catch (error) {
			console.error('Ошибка при создании таблицы users:', error)
		}
	}
	// Проверяем наличие таблицы equipmentTypes
	const checkEquipmentTypes = async () => {
		try {
			const equipmentTypesExists = await knex.schema.hasTable('equipmentTypes')
			if (!equipmentTypesExists) {
				await knex.schema.createTable('equipmentTypes', (table) => {
					table.increments('id').primary()
					table.string('name', 255).notNullable().unique()
				})
			}
			const equipmentTypes = [
				'Фронтальный погрузчик',
				'Самосвал',
				'Бульдозер',
				'Экскаватор',
				'Трактор',
				'Самопогрузчик',
				'Легковой автомобиль',
				'Микроавтобус',
			]

			for (const typeName of equipmentTypes) {
				const typeExists = await knex('equipmentTypes').where({ name: typeName }).first()

				if (!typeExists) {
					await knex('equipmentTypes').insert({
						name: typeName,
					})
				}
			}
		} catch (error) {
			console.error(error)
		}
	}

	// Проверяем наличие таблицы equipment
	const checkEquipment = async () => {
		try {
			const equipmentExists = await knex.schema.hasTable('equipment')

			if (!equipmentExists) {
				await knex.schema.createTable('equipment', (table) => {
					table.increments('id').primary()
					table.integer('typeId').unsigned()
					table.string('name', 255).notNullable()
					table.string('dimensions', 255)
					table.integer('weight')
					table.string('licensePlate', 255)
					table.string('nickname', 255)
					table.foreign('typeId').references('equipmentTypes.id')
				})
			}
		} catch (error) {
			console.error('Ошибка при создании таблицы equipment:', error)
		}
	}
	const checkUserEquipmentTypes = async () => {
		try {
			const userEquipmentTypesExists = await knex.schema.hasTable('userEquipmentTypes')
			if (!userEquipmentTypesExists) {
				await knex.schema.createTable('userEquipmentTypes', (table) => {
					table.integer('userId').unsigned()
					table.foreign('userId').references('users.id')

					table.integer('equipmentTypeId').unsigned()
					table.foreign('equipmentTypeId').references('equipmentTypes.id')
				})
			}
		} catch (error) {
			console.error(error)
		}
	}
	// Проверяем наличие таблицы objects
	const checkObjects = async () => {
		try {
			const objectsExists = await knex.schema.hasTable('objects')

			if (!objectsExists) {
				await knex.schema.createTable('objects', (table) => {
					table.increments('id').primary()
					table.string('name', 255).notNullable()
					table.string('contacts', 255)
					table.string('address', 255)
				})
			}
		} catch (error) {
			console.error(error)
		}
	}
	// Проверяем наличие таблицы travelLogs
	const checkTravelLogs = async () => {
		try {
			const travelLogsExists = await knex.schema.hasTable('travelLogs')

			if (!travelLogsExists) {
				await knex.schema.createTable('travelLogs', (table) => {
					table.increments('id').primary()
					table.date('date')
					table.integer('shiftNumber')
					table.integer('userId').unsigned()
					table.integer('objectId').unsigned()
					table.integer('equipmentId').unsigned()
					table.integer('hoursWorked')
					table.integer('hoursIdle')
					table.text('comments')
					table.foreign('userId').references('users.id')
					table.foreign('objectId').references('objects.id')
					table.foreign('equipmentId').references('equipment.id')
				})
			}
		} catch (error) {
			console.error(error)
		}
	}

	try {
		await checkRoles()
		await checkUsers()
		await checkUserEquipmentTypes()
		await checkEquipmentTypes()
		await checkEquipment()
		await checkObjects()
		await checkTravelLogs()

		logger.info('Database initialized successfully')
	} catch (error) {
		console.error('Ошибка при инициализации базы данных:', error)
	}
}

export default knex
