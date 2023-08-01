// import Mutations from './mutations.graphql'
import Queries from './queries.graphql'
import Subscriptions from './subscriptions.graphql'
import { makeExecutableSchema, mergeSchemas } from '@graphql-tools/schema'
import { mergeTypeDefs } from'@graphql-tools/merge'
import resolvers from '../resolvers.ts'
// import {Schemas, Subscriptions, Mutations, Queries} from './'

const types = [Subscriptions,/* Mutations,*/ Queries]
const typeDefs = mergeTypeDefs(types)

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema 