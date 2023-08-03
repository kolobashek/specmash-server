import logger from './config/logger';
import Role from './models/role';
import User from './models/user'
import {hash} from 'bcrypt'

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
    isActive: async (_: any, { userId }: { userId: Number }): Promise<boolean> => {
      // Получаем пользователя по id
      const result = await User.isActive(userId)
      logger.debug(JSON.stringify(result))
      // Возвращаем флаг активности
      return result
    },
  },
  Mutation: {
    createUser: async (_: any, { data }: { data: CreateUserInput }) => {
      // хэширование пароля
      const hashedPassword = await hash(data.password, 10)

      // Добавление роли по умолчанию
      data.roleId = 3

      // Регистрация пользователя с хэшированным паролем и ролью по умолчанию
      const user = await User.query().insert({
        ...data,
        password: hashedPassword,
      })
      return user
    },
    activateUser: async (parent: any, {input}: any) => {
      const {userId} = input
      // Активация пользователя по id
      const result = await User.activateUser(userId)
      return result
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
}
type UserIdInput = {
  userId: number
}