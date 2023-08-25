const typeDefs = `#graphql
  type Query {
    users: [User!] 
    user(id: ID!): User
  }
`
export default typeDefs
