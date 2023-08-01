import User from './models/user'

const resolvers = {
  Query: {
    users: async () => {
      // получить пользователей из БД
      // const users = await db.query('SELECT * FROM users')
      // return users
      const users = await User.query();
      console.log(users)
    },

    roles: async () => {
      // получить роли из БД
    },

    equipment: async () => {
      // получить оборудование из БД
    },

    objects: async () => {
      // получить объекты из БД
    },

    travelLogs: async () => {
      // получить путевые листы из БД
    },
  },
}

export default resolvers
