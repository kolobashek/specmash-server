const typeDefs = `#graphql
  type Query {
    # users: [User!] @auth(role: admin)
    # user(id: ID!): User @auth(role: manager)
    me: User
    user(id:ID!): User
    isActive(userId: ID!): Boolean
    findByPhone(phone: String!): User
    
    roles: [Role]!

    getEquipmentTypes: [EquipmentType]!

    equipments: [Equipment]!
    equipmentByType(typeId: ID!): [Equipment!]

    objects: [Object]!
    object(id: ID!): Object

    travelLogs(dateStart: String, dateEnd: String, user: [String], equipment: [String], comments: String): [TravelLog]
    travelLog(id: ID!): TravelLog!
  }
`
export default typeDefs
