const typeDefs = `#graphql

  input UserIdInput {
    userId: Int!
  }
  input IdName {
    id: Int
    name: String
  }
  input CreateUserInput {
    name: String!
    phone: String!
    password: String!
    role: String
    nickname: String
    comment: String
  }
  input UpdateUserInput {
    id: Int!
    name: String!
    phone: String!
    password: String
    role: String
    nickname: String
    isActive: Boolean
    comment: String
  }

  input CreateTravelLogInput {
    driver: Int
    object: Int
    contrAgent: Int
    equipment: Int
    date: String!
    shiftNumber: Int!
    hoursWorked: Float
    breaks: Float
    comments: String
  }

  input CreateContrAgentInput {
    name: String!
    contacts: String
    address: String
    comments: String
    objects: [Int]
  }

  input UpdateTravelLogInput {
    id: Int!
    driverId: Int
    objectId: Int
    equipmentId: Int
    date: String!
    shiftNumber: Int!
    hoursWorked: Float
    breaks: Float
    comments: String
  }
  
  input UpdateContrAgentInput {
    id: Int!
    name: String!
    contacts: String
    address: String
    comments: String
    objects: [Int]
  }

  input CreateObjectInput {
    name: String!
    contacts: String
    address: String
    contrAgents: [Int]
  }
  input UpdateObjectInput {
    id: Int!
    name: String!
    contacts: String
    address: String
    contrAgents: [Int]
  }

  input CreateEquipmentInput {
    name: String!
    type: String!
    dimensions: String
    weight: Int
    licensePlate: String
    nickname: String
  }
  input UpdateEquipmentInput {
    id: Int!
    name: String!
    type: String
    dimensions: String
    weight: Int
    licensePlate: String
    nickname: String
  }
  input UsersFilterInput {
    name: String
	  role: String
	  isActive: Boolean
  }
`
export default typeDefs
