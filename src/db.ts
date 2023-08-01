// // Импорты
// import knex from 'knex'
// import * as dotenv from 'dotenv';
// import logger from './config/logger.ts'


// dotenv.config();
// const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
// export const knexConfig = {
//   client: 'mysql',
//   connection: {
//     host: DB_HOST,
//     port: Number(DB_PORT),
//     user: DB_USER,
//     password: DB_PASSWORD,
//     database: DB_NAME,
//   },
// };

// // Настройки подключения к БД
// const db = knex(knexConfig)

// // Проверка подключения к БД
// export async function checkDbConnection() {
// console.log({ DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME });
//   try {
//     await db.raw('SELECT 1');
//     logger.info('Connected to database'); 
//     return 'success'
//   } catch (err) {
//     logger.error('Error connecting to database:', err);
//     return 'error'
//   }
// }

// // Инициализация БД
// export async function initDB() {
//   // Проверка и создание таблиц
//   try {

//     await db.schema.hasTable('roles').then(async (exists) => {
//       if (!exists) {
//         await db.schema.createTable('roles', (table) => {
//           table.increments('id').primary();
//           table.string('name', 255).notNullable(); 
//         });
    
//         // Добавление ролей по умолчанию
//         await db('roles').insert([
//           {name: 'admin'},
//           {name: 'manager'}, 
//           {name: 'driver'}
//         ]);
//       }
//     });

//   } catch (error) {
//     console.error('Ошибка при создании таблицы roles:', error);
//   }


// try {

//   await db.schema.hasTable('users').then(async (exists) => {
//     if (!exists) {
//       await db.schema.createTable('users', (table) => {
//         table.increments('id').primary();
//         table.string('phone', 255).notNullable().unique;
//         table.string('name', 255).notNullable();
//         table.string('password', 255).notNullable();
//         table.integer('roleId').notNullable().defaultTo(3);
//         table.foreign('roleId').references('roles.id');
//       });

//       // Добавление пользователей по умолчанию
//       await db('users').insert([
//         {
//           phone: '123',
//           name: 'Test User',
//           password: 'password',
//           roleId: 1
//         }
//       ]);
//     }
//   });

// } catch (error) {
//   console.error('Ошибка при создании таблицы users:', error);
// }


//   // Проверяем наличие таблицы equipmentTypes
//   try {
//     const equipmentTypesExists = await db.schema.hasTable('equipmentTypes');

//     if (!equipmentTypesExists) {
//       await db.schema.createTable('equipmentTypes', (table) => {
//         table.increments('id').primary();
//         table.string('name', 255).notNullable();
//       });
//     }
//   } catch (error) {
//     console.error(error);
//   }

//   // Проверяем наличие таблицы equipment
//   const equipmentExists = await db.schema.hasTable('equipment');

//   try {
//     if (!equipmentExists) {
//       await db.schema.createTable('equipment', (table) => {
//         table.increments('id').primary();
//         table.integer('typeId');
//         table.string('name', 255).notNullable();
//         table.string('dimensions', 255);
//         table.integer('weight');
//         table.string('license_plate', 255);
//         table.string('nickname', 255);
//         table.foreign('typeId').references('equipmentTypes.id');
//       });
//     }
//   } catch (error) {
//     console.error('Ошибка при создании таблицы equipment:', error);
//   }

//   // Проверяем наличие таблицы objects
//   try {
//     const objectsExists = await db.schema.hasTable('objects');

//     if (!objectsExists) {
//       await db.schema.createTable('objects', (table) => {
//         table.increments('id').primary();
//         table.string('name', 255).notNullable();
//         table.string('contacts', 255);
//         table.string('address', 255);
//       });
//     }
//   } catch (error) {
//     console.error(error);
//   }

//   // Проверяем наличие таблицы travelLogs
//   try {
//     const travelLogsExists = await db.schema.hasTable('travelLogs');

//     if (!travelLogsExists) {
//       await db.schema.createTable('travelLogs', (table) => {
//         table.increments('id').primary();
//         table.date('date');
//         table.integer('shiftNumber');
//         table.integer('driverId');
//         table.integer('objectId');
//         table.integer('equipmentId');
//         table.integer('hours_worked');
//         table.integer('hours_idle');
//         table.text('comments');
//         table.foreign('driverId').references('users.id');
//         table.foreign('objectId').references('objects.id');
//         table.foreign('equipmentId').references('equipment.id');
//       });
//     }
//   } catch (error) {
//     console.error(error);
//   }

//   logger.info('Database initialized successfully');
// }

// export default db
