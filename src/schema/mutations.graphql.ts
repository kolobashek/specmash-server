const typeDefs = `#graphql
  type Mutation {
    register(input: CreateUserInput!): User
    activateUser(input: UserIdInput!): IsActivePayload
    login(phone: String!, password: String!): LoginPayload
    createTravelLog(input: CreateTravelLogInput!): TravelLog
    createEquipment(
      name: String!,
      type:String!,
      dimensions: String
      weight: Int
      licensePlate: String
      nickname: String
    ): Equipment
  }
`
export default typeDefs
