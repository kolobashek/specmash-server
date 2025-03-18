import { getConnection } from '../../src/db/connection'
import fs from 'fs'
import path from 'path'

export async function setupTestDatabase() {
	const connection = await getConnection()

	// Выполняем SQL-скрипт для создания тестовой схемы
	const setupScript = fs.readFileSync(path.join(__dirname, '../fixtures/setup.sql'), 'utf8')

	await connection.query(setupScript)

	// Заполняем тестовыми данными
	const seedScript = fs.readFileSync(path.join(__dirname, '../fixtures/seed.sql'), 'utf8')

	await connection.query(seedScript)
}

export async function cleanupTestDatabase() {
	const connection = await getConnection()

	// Выполняем SQL-скрипт для очистки тестовой схемы
	const cleanupScript = fs.readFileSync(path.join(__dirname, '../fixtures/cleanup.sql'), 'utf8')

	await connection.query(cleanupScript)

	// Закрываем соединение
	await connection.end()
}
