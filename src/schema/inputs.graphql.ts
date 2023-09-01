const typeDefs = `#graphql

  input UserIdInput {
    userId: Int!
  }

  input CreateUserInput {
    name: String!
    phone: String!
    password: String!
    role: String
    nickname: String
    comment: String
  }

  input CreateTravelLogInput {
    driverId: Int
    objectId: Int
    equipmentId: Int
    date: String!
    shiftNumber: Int!
    hoursWorked: Float
    breaks: Float
    comments: String
  }

`
export default typeDefs
