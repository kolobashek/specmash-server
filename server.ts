import {server} from './src/app'
import Knex from 'knex';
import knexConfig from './src/config/knexfile';
import { Model, ForeignKeyViolationError, ValidationError } from 'objection';

// Initialize knex.
const knex = Knex(knexConfig.development)
Model.knex(knex);

const port = Number(process.env.SERVER_PORT) || 3000

// dbConnect()
server(port)
