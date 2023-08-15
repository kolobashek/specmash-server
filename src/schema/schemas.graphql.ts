const typeDefs = `#graphql
  directive @auth(roles: [String]) on FIELD_DEFINITION
  type User {
    id: ID!
    name: String!
    nickname: String
    password: String!
    phone: String!
    role: Role!
    isActive: Boolean!
    comment: String
  }
  type IsActivePayload {
    isActive: Boolean!
  }
  type LoginPayload {
    token: String!
  }
  type Role {
    id: ID!
    name: String!
  }
  type Auth {
    token: String!
    user: User!
  }
  type Equipment {
    id: ID!
    type: EquipmentType!
    name: String!
  }
  type EquipmentType {
    id: ID!
    name: String!
  }
  type Object {
    id: ID!
    name: String!
    address: String
  }
  type TravelLog {
    id: ID!
    driver: User
    object: Object
    equipment: Equipment
    date: String
    shiftNumber: Int
    hours: Float
    breaks: Float
    comment: String
  }
`
export default typeDefs
