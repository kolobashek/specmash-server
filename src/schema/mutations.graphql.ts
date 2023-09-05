const typeDefs = `#graphql
  type Mutation {
    #Users
    updateUser(input: UpdateUserInput): User
    toggleUserActive(input: UserIdInput!): Boolean
    #Auth
    register(input: CreateUserInput!): User
    login(phone: String!, password: String!): LoginPayload
    #Shifts
    createTravelLog(input: CreateTravelLogInput!): TravelLog
    #Equipments
    createEquipment(
      name: String!,
      type:String!,
      dimensions: String
      weight: Int
      licensePlate: String
      nickname: String
    ): Equipment
    #ContrAgents
    createContrAgent(input: CreateContrAgentInput!): ContrAgent
    #Objects
    createObject(input: CreateObjectInput!): Object
  }
`
export default typeDefs
