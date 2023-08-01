import {server} from './src/app'

const port = Number(process.env.SERVER_PORT) || 3000

server(port)
