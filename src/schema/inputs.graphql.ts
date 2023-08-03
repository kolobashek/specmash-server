const typeDefs = `#graphql

  input UserIdInput {
    userId: Int!
  }

  input CreateUserInput {
    name: String!
    phone: String!
    password: String!
    roleId: Int
  }

`
export default typeDefs
