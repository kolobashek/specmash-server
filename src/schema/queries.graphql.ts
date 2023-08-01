const typeDefs = `#graphql
  type Query {
    users: [User!]
    user(id: ID!): User
    userIsActive(id: ID!): Boolean
    findByPhone(phone: String!): User
    createUser(data: CreateUserInput!): User!
  
  
    roles: [Role!]

    equipment: [Equipment!]!
    equipmentByType(typeId: ID!): [Equipment!]

    objects: [Object!]!
    object(id: ID!): Object

    travelLogs: [TravelLog!]!
    travelLog(id: ID!): TravelLog
  }
`
export default typeDefs

