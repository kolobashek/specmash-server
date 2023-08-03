import http from 'http'
import { createYoga } from 'graphql-yoga'
import { useJWT } from '@graphql-yoga/plugin-jwt'
import { useCookies } from '@whatwg-node/server-plugin-cookies'
import schema from './schema'
// import logger from './config/logger'
const signingKey = process.env.JWT_SECRET || 'secret'

const yoga = createYoga({
  schema,
  plugins: [
    useCookies(),
    useJWT({
      issuer: 'http://graphql-yoga.com',
      signingKey,
      getToken: ({ request }: { request: any }) =>
        request.cookieStore?.get('authorization'),
    }),
  ],
})
const server = http.createServer(yoga)

export function startServer(port: number) {
  server.listen(port, () => {
    console.info(`Server is running on http://localhost:${port}/graphql`)
  })
}
