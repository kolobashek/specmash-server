const typeDefs = `#graphql
  type Mutation {
    createUser(input: CreateUserInput!): User
  }

  input CreateUserInput {
    name: String!
    phone: String!
    password: String!
    roleId: Int
  }

`
export default typeDefs
