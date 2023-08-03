import Mutations from './mutations.graphql'
import Queries from './queries.graphql'
import Schemas from './schemas.graphql.ts'
import Inputs from './inputs.graphql'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { mergeTypeDefs } from'@graphql-tools/merge'
import resolvers from '../resolvers.ts'

const types = [Schemas, Mutations, Queries, Inputs]
const typeDefs = mergeTypeDefs(types)

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema 