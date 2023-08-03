const typeDefs = `#graphql
  type Mutation {
    createUser(input: CreateUserInput!): User
    activateUser(input: UserIdInput): IsActivePayload
  }
`
export default typeDefs
