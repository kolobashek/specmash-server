const typeDefs = `#graphql
  type Mutation {
    register(input: CreateUserInput!): User
    activateUser(input: UserIdInput): IsActivePayload
    login(phone: String!, password: String!): String
  }
`
export default typeDefs
