// user.graphql.js

import { makeExecutableSchema } from 'graphql-tools'
import resolvers from '../resolvers.js'

const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    phone: String!
    role: Role!
  }

  type Role {
    id: ID!
    name: String!
  }

  type Equipment {
    id: ID!
    type: EquipmentType!
    name: String!
  }

  type EquipmentType {
    id: ID!
    name: String!
  }

  type Object {
    id: ID!
    name: String!
    address: String
  }

  type TravelLog {
    id: ID!
    driver: User!
    object: Object!
    equipment: Equipment! 
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    isActive(id: ID!): Boolean!
  

    roles: [Role!]!

    equipment: [Equipment!]!
    equipmentByType(typeId: ID!): [Equipment!]

    objects: [Object!]!
    object(id: ID!): Object

    travelLogs: [TravelLog!]!
    travelLog(id: ID!): TravelLog
  }
`

const schema = makeExecutableSchema({ typeDefs, resolvers })

export default schema
