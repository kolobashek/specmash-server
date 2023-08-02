// Импорты
import knex, {Knex} from 'knex'
import logger from './config/logger.ts'
import knexConfig from './config/knexfile'

// Настройки подключения к БД
const db = knex(knexConfig.development)

// Проверка подключения к БД
// export async function checkDbConnection() {
//   console.log({ DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME })
//   try {
//     await db.raw('SELECT 1')
//     logger.info('Connected to database')
//     return 'success'
//   } catch (err) {
//     logger.error('Error connecting to database:', err)
//     return 'error'
//   }
// }

// Инициализация БД
export async function initDB() {
    // Проверка и создание таблиц
    const checkRoles = async () => {
        try {
            const RolesExists = await db.schema.hasTable('roles')

            if (!RolesExists) {
                await db.schema.createTable('roles', (table) => {
                table.increments('id').primary()
                table.string('name', 255).notNullable()
                })

                // Добавление ролей по умолчанию
                await db('roles').insert([
                    { name: 'admin' },
                    { name: 'manager' },
                    { name: 'driver' },
                ])
            }
        } catch (error) {
            console.error('Ошибка при создании таблицы roles:', error)
        }
    }
    const checkUsers = async () => {
        try {
            const usersExists = await db.schema.hasTable('users')

            if (!usersExists) {
                await db.schema.createTable('users', (table) => {
                    table.increments('id').primary()
                    table.string('phone', 255).notNullable().unique
                    table.string('name', 255).notNullable()
                    table.string('password', 255).notNullable()
                    table
                      .integer('roleId')
                      .notNullable()
                      .defaultTo(3)
                      .unsigned()
                    table.foreign('roleId').references('roles.id')
                })

                // Добавление пользователей по умолчанию
                await db('users').insert([
                    {
                        phone: '123',
                        name: 'Test User',
                        password: 'password',
                        roleId: 1,
                    },
                ])
            }
        } catch (error) {
            console.error('Ошибка при создании таблицы users:', error)
        }
    }
    // Проверяем наличие таблицы equipmentTypes
    const checkEquipmentTypes = async () => {
        try {
            const equipmentTypesExists = await db.schema.hasTable('equipmentTypes')

            if (!equipmentTypesExists) {
            await db.schema.createTable('equipmentTypes', (table) => {
                table.increments('id').primary()
                table.string('name', 255).notNullable()
            })
            }
        } catch (error) {
            console.error(error)
        }
    }

    // Проверяем наличие таблицы equipment
    const checkEquipment = async () => {
        try {
            const equipmentExists = await db.schema.hasTable('equipment')

            if (!equipmentExists) {
            await db.schema.createTable('equipment', (table) => {
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
  // Проверяем наличие таблицы objects
    const checkObjects = async () => {
        try {
            const objectsExists = await db.schema.hasTable('objects')

            if (!objectsExists) {
            await db.schema.createTable('objects', (table) => {
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
            const travelLogsExists = await db.schema.hasTable('travelLogs')

            if (!travelLogsExists) {
            await db.schema.createTable('travelLogs', (table) => {
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
        await checkEquipmentTypes()
        await checkEquipment()
        await checkObjects()
        await checkTravelLogs()

        logger.info('Database initialized successfully')
    } catch (error) {
        console.error('Ошибка при инициализации базы данных:', error)
    }
}

export default db
