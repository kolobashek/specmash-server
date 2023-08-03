const typeDefs = `#graphql
  type Mutation {
    register(input: CreateUserInput!): User
    activateUser(input: UserIdInput): IsActivePayload
  }
`
export default typeDefs
