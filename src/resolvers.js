import * as db from './db.js'

const resolvers = {
  Query: {
    users: async () => {
      // получить пользователей из БД
      const users = await db.db.query('SELECT * FROM users')
      return users
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
