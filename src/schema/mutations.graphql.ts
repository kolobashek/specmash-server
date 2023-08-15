const typeDefs = `#graphql
  type Mutation {
    register(input: CreateUserInput!): User
    activateUser(input: UserIdInput!): IsActivePayload
    login(phone: String!, password: String!): LoginPayload
    createTravelLog(input: CreateTravelLogInput!): TravelLog
  }
`
export default typeDefs
