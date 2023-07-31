// Импорты
import knex from 'knex'
import { makeExecutableSchema } from 'graphql-tools'
import logger from '../config/logger.js'

// Настройки подключения к БД
const db = knex({
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
})

// Проверка подключения
async function checkDbConnection() {
  try {
    await db.raw('SELECT 1')
    logger.info('Connected to database')
  } catch (err) {
    logger.error('Error connecting to database:', err)
  }
}

// Инициализация БД
async function initDB() {
  // Проверка и создание таблиц
  await db.schema.hasTable('roles').then(async (exists) => {
    if (!exists) {
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
  })

  await db.schema.hasTable('users').then(async (exists) => {
    if (!exists) {
      await db.schema.createTable('users', (table) => {
        table.increments('id').primary()
        table.string('phone', 255).notNullable()
        table.string('name', 255).notNullable()
        table.string('password', 255).notNullable()
        table.integer('role_id').notNullable()
        table.foreign('role_id').references('roles.id')
      })
    }
  })

  // Аналогично для остальных таблиц

  logger.info('Database initialized successfully')
}

// Схема GraphQL
const typeDefs = `
  type User {
    id: Int!
    name: String!
    phone: String!
  }

  type Query {
    users: [User!]!
  }
`

const resolvers = {
  Query: {
    users: () => {
      return db('users')
    },
  },
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

export default {
  db,
  checkDbConnection,
  initDB,
  schema,
}
