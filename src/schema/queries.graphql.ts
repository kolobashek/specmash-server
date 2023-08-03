const typeDefs = `#graphql
  type Query {
    users: [User!]
    user(id: ID!): User
    isActive(userId: ID!): Boolean
    findByPhone(phone: String!): User
    
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

