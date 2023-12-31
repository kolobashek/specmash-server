const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    nickname: String
    password: String!
    phone: String!
    role: Role
    isActive: Boolean!
    comment: String
  }
  type IsActivePayload {
    isActive: Boolean!
  }
  type LoginPayload {
    token: String!
  }
  enum Role {
    admin
    manager
    driver
    UNDEFINED
}
  type Auth {
    token: String!
    user: User!
  }
  type Equipment {
    id: ID!
    type: String!
    name: String!
    dimensions: String
    weight: Int
    licensePlate: String
    nickname: String	
  }
  type EquipmentType {
    id: ID!
    name: String!
  }
  type Object {
    id: ID!
    name: String!
    contacts: String
    address: String
    contrAgents: [ContrAgent]
  }
  type ObjectMini {
    id: ID!
    name: String!
  }
  type ContrAgent {
    id: ID!
    name: String!
    contacts: String
    address: String
    comments: String
    objects: [Object]
  }
  type ContrAgentMini {
    id: ID!
    name: String!
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
