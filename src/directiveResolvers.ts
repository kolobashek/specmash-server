import logger from './config/logger'
import Role from './models/role'
import User from './models/user'
import jwt from 'jsonwebtoken'
import { GraphQLError } from 'graphql'

const signingKey = process.env.JWT_SECRET || 'secret'

const directiveResolvers = {
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
    isActive: async (root: any, { userId }: { userId: Number }, context: any): Promise<boolean> => {
      // Получаем пользователя по id
      const result = await User.isActive(userId)
      logger.debug(JSON.stringify(result))
      // Возвращаем флаг активности
      return result
    },
    me: (parent: any, args: any, ctx: any) => {
      // The content of the JWT can be found in the context
      if (!ctx.jwt) {
        // No JWT token provided, we are not authenticated
        return null
      }
      return User.getUserById(ctx.jwt.sub)
    },
  },
  Mutation: {
    register: async (_: any, { input }: { input: CreateUserInput }) => {
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
    login: async (parent: any, { phone, password }: any, ctx: any) => {
      const user = await User.getUserByPhone(phone, password)
      if (user instanceof Error) {
        throw new GraphQLError('Invalid credentials')
      }

      const token = (jwt as any).sign({ username: user.name }, signingKey, {
        subject: user.id,
      })

      // Set the cookie on the response
      ctx.request.cookieStore?.set({
        name: 'authorization',
        sameSite: 'strict',
        secure: true,
        domain: 'specmash.su',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours
        value: token,
        httpOnly: true,
      })
    },
  },
}

export default directiveResolvers

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
  input: {
    userId: number
  }
}
