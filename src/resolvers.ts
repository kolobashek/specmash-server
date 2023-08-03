import logger from './config/logger';
import Role from './models/role';
import User from './models/user'
import { GraphQLError } from 'graphql'

const resolvers = {
  Query: {
    users: async () => {
      // получить пользователей из БД
      const users = await User.query()
      return users
    },

    roles: async () => {
      // получить роли из БД
      const roles = await Role.query()
      return roles
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

    findByPhone: async (_: any, { phone }: { phone: string }) => {
      const user = await User.query().where({ phone }).first()
      return user
    },
    isActive: async (root: any, { userId }: { userId: Number }, context:any): Promise<boolean> => {
      // Получаем пользователя по id
      const result = await User.isActive(userId)
      logger.debug(JSON.stringify(result))
      // Возвращаем флаг активности
      return result
    },
  },
  Mutation: {

    register: async (_: any, {input}:{input:CreateUserInput}) => {
      try {
        const user = await User.create(input)
        return user
      } catch (error: any) {
        return new GraphQLError(error.message)
      }
    },
    activateUser: async (parent: any, { input }: UserIdInput) => {
      try {
        const { userId } = input
        // Активация пользователя по id
        const result = await User.activateUser(userId)
        return result
      } catch (error: any) {
        return new GraphQLError(error.message)
      }
    },
  },
}

export default resolvers

type CreateUserInput = {
  name: string
  password: string
  phone: string
  roleId?: number
  isActive?: boolean
  nickname?: string
  comment?: string
}
type UserIdInput = {
  input:{
    userId: number
  }
}