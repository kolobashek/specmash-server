import { makeExecutableSchema } from '@graphql-tools/schema'
import { mergeTypeDefs } from '@graphql-tools/merge'
import Mutations from './mutations.graphql'
import Queries from './queries.graphql'
import Schemas from './schemas.graphql.ts'
import Inputs from './inputs.graphql'
import adminQueries from './admin.queries.graphql.ts'
import resolvers from '../resolvers/index.ts'

const types = [Schemas, Mutations, Queries, adminQueries, Inputs]
const typeDefs = mergeTypeDefs(types)

let schema = makeExecutableSchema({
	typeDefs: [typeDefs],
	resolvers,
})

export default schema
