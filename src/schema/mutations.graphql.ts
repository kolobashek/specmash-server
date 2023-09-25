const typeDefs = `#graphql
  type Mutation {
    #Users
    updateUser(input: UpdateUserInput!): User
    toggleUserActive(input: UserIdInput!): Boolean
    #Auth
    register(input: CreateUserInput!): User
    login(phone: String!, password: String!): LoginPayload
    #Shifts
    createTravelLog(input: CreateTravelLogInput!): TravelLog
    #Machines
    createEquipment(input: CreateEquipmentInput): Equipment
    updateEquipment(input: UpdateEquipmentInput!): Equipment
    #ContrAgents
    createContrAgent(input: CreateContrAgentInput!): ContrAgent
    updateContrAgent(input: UpdateContrAgentInput!): ContrAgent
    #Objects
    createObject(input: CreateObjectInput!): Object
    updateObject(input: UpdateObjectInput!): Object
  }
`
export default typeDefs
