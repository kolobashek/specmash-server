import http from 'http'
import { createYoga } from 'graphql-yoga'
import schema from './schema'
// import logger from './config/logger'

const yoga = createYoga({schema})
const server = http.createServer(yoga)

export function startServer(port: number) {
  server.listen(port, () => {
    console.info(`Server is running on http://localhost:${port}/graphql`)
  })
}
