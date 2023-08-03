import { startServer } from './src/app'
import {startDbServer} from './src/db'

const port = Number(process.env.SERVER_PORT) || 3000

startDbServer()

startServer(port)
