import http from 'http'
import { createYoga } from 'graphql-yoga'
import schema from './schema'
import logger from './config/logger'

const yoga = createYoga({
  schema,
  // logging: {
  //   info(...arguments) {
  //     logger.info(...arguments)
  //   },
  //   warn(...arguments) {
  //     logger.warn(...arguments)
  //   },
  //   error(...arguments) {
  //     logger.error(...arguments)
  //   },
  //   debug(...arguments) {
  //     logger.debug(...arguments)
  //   },
  // },
})
const server = http.createServer(yoga)
export function startServer(port: number) {
  // server.on('request', (request:any, response) => {
  //   try {
  //     console.log(request)
  //     logger.debug(JSON.stringify(request.extensions))
  //   } catch (e:any) {
  //     logger.error(e.message)
  //     response.statusCode = 500
  //     response.end(e.message)
  //   }
  // })
  server.listen(port, () => {
    console.info(`Server is running on http://localhost:${port}/graphql`)
  })
}
