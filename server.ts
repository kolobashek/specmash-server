import { startServer } from './src/app'
import { sequelize } from './src/db'

const port = Number(process.env.SERVER_PORT) || 3000

const testDB = async () => {
	try {
		await sequelize.authenticate()
		console.log('Connection has been established successfully.')
		await sequelize.sync({ alter: true })
		console.log('Database synced successfully.')
	} catch (error) {
		console.error('Unable to connect to the database:', error)
	}
}
testDB()
startServer(port)
