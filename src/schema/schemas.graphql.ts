import { EquipmentType } from './../models/equipmentType'
const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    nickname: String
    password: String
    phone: String!
    roles: [Role]
    isActive: Boolean!
    comment: String
  }
  type IsActivePayload {
    isActive: Boolean!
  }
  type LoginPayload {
    token: String!
    user: User!
  }
  type Role {
    id: Int!
    name: String!
    comment: String
  }
  type Auth {
    token: String!
    user: User!
  }
  type Equipment {
    id: ID!
    type: EquipmentType!
    name: String!
    dimensions: String
    weight: Int
    licensePlate: String
    nickname: String	
  }
  type EquipmentType {
    id: ID!
    name: String!
    drivingLicenseCategory: String
    comment: String
  }
  type WorkPlace {
    id: ID!
    name: String!
    contacts: String
    address: String
    partners: [Partner]
  }
  type Partner {
    id: ID!
    name: String!
    contacts: String
    address: String
    comments: String
    workPlaces: [WorkPlace]
  }
  type TravelLog {
    id: ID!
    driver: User
    workPlace: WorkPlace 
    partner: Partner
    equipment: Equipment
    date: String
    shiftNumber: Int
    hours: Float
    breaks: Float
    comments: String
  }
`
export default typeDefs
