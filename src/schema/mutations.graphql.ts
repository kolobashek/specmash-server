import { makeExecutableSchema } from '@graphql-tools/schema'

const typeDefs = `#graphql

`
const schema = makeExecutableSchema({
  typeDefs,
  resolvers:{},
})

export default schema
