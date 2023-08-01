// Импорты
import knex from 'knex'
import { makeExecutableSchema } from 'graphql-tools'
import logger from './config/logger.ts'

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// Настройки подключения к БД
const db = knex({
  client: 'mysql',
  connection: {
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
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
        table.increments('id').primary();
        table.string('name', 255).notNullable();
      });

      // Добавление ролей по умолчанию
      await db('roles').insert([
        { name: 'admin' },
        { name: 'manager' },
        { name: 'driver' },
      ]);
    }
  });

  await db.schema.hasTable('users').then(async (exists) => {
    if (!exists) {
      await db.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('phone', 255).notNullable().unique;
        table.string('name', 255).notNullable();
        table.string('password', 255).notNullable();
        table.integer('role_id').notNullable().defaultTo(3);
        table.foreign('role_id').references('roles.id');
      });
    }
  });

  // Проверяем наличие таблицы equipment_types
  try {
    const equipmentTypesExists = await db.schema.hasTable('equipment_types');

    if (!equipmentTypesExists) {
      await db.schema.createTable('equipment_types', (table) => {
        table.increments('id').primary();
        table.string('name', 255).notNullable();
      });
    }
  } catch (error) {
    console.error(error);
  }

  // Проверяем наличие таблицы equipment
  const equipmentExists = await db.schema.hasTable('equipment');

  if (!equipmentExists) {
    await db.schema.createTable('equipment', (table) => {
      table.increments('id').primary();
      table.integer('type_id');
      table.string('name', 255).notNullable();
      table.string('dimensions', 255);
      table.integer('weight');
      table.string('license_plate', 255);
      table.string('nickname', 255);
      table.foreign('type_id').references('equipment_types.id');
    });
  }

  // Проверяем наличие таблицы objects
  try {
    const objectsExists = await db.schema.hasTable('objects');

    if (!objectsExists) {
      await db.schema.createTable('objects', (table) => {
        table.increments('id').primary();
        table.string('name', 255).notNullable();
        table.string('contacts', 255);
        table.string('address', 255);
      });
    }
  } catch (error) {
    console.error(error);
  }

  // Проверяем наличие таблицы travel_logs
  try {
    const travelLogsExists = await db.schema.hasTable('travel_logs');

    if (!travelLogsExists) {
      await db.schema.createTable('travel_logs', (table) => {
        table.increments('id').primary();
        table.date('date');
        table.integer('shift_number');
        table.integer('driver_id');
        table.integer('object_id');
        table.integer('equipment_id');
        table.integer('hours_worked');
        table.integer('hours_idle');
        table.text('comments');
        table.foreign('driver_id').references('users.id');
        table.foreign('object_id').references('objects.id');
        table.foreign('equipment_id').references('equipment.id');
      });
    }
  } catch (error) {
    console.error(error);
  }

  logger.info('Database initialized successfully');
}

export default db
