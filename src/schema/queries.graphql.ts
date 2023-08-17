const typeDefs = `#graphql
  type Query {
    users: [User!] @auth(roles: ["admin", "manager"])
    user(id: ID!): User @auth(roles: ["admin", "manager", "driver"])
    me: User
    isActive(userId: ID!): Boolean
    findByPhone(phone: String!): User
    
    roles: [Role!]

    equipmentTypes: [EquipmentType]!

    equipments: [Equipment]!
    equipmentByType(typeId: ID!): [Equipment!]

    objects: [Object!]!
    object(id: ID!): Object

    travelLogs(dateStart: String, dateEnd: String, user: [String], equipment: [String], comments: String): [TravelLog]
    travelLog(id: ID!): TravelLog!
  }
`
export default typeDefs
