import {server} from './src/app'
import Knex from 'knex';
import knexConfig from './src/config/knexfile';
import { Model, ForeignKeyViolationError, ValidationError } from 'objection';
import {initDB} from './src/db'

const port = Number(process.env.SERVER_PORT) || 3000
// Initialize knex.
const startServer = async () => {
    const knex = Knex(knexConfig.development)
    await initDB()
    Model.knex(knex);
}

startServer()
// dbConnect()
server(port)
