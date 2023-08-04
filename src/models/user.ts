import { Model } from 'objection';
import { hash, compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { knex } from '../db'
import Role from './role'
import logger from '../config/logger';

const signingKey = process.env.JWT_SECRET || 'secret'

interface User {
  id: number
  name: string
  nickname: string
  phone: string
  password: string
  hash: string
  roleId: number
  isActive: boolean
  comment: string
}
class User extends Model implements User {
  constructor(
    phone?: string,
    hash?: string,
    password?: string,
    id?: number,
    name?: string,
    nickname?: string,
    roleId?: number,
    isActive?: boolean,
    comment?: string
  ) {
    super()
    this.id = id || 0
    this.hash = hash || ''
    this.password = password || ''
    this.name = name || ''
    this.nickname = nickname || ''
    this.phone = phone || ''
    this.roleId = roleId || 3
    this.isActive = isActive || false
    this.comment = comment || ''
  }
  static async create(data: any) {
    try {
      const { password, phone, ...userData } = data
      // Добавление умолчаний
      userData.roleId = 3
      userData.isActive = false
      const isUserExists = await this.findByPhone(phone)
      if (isUserExists) {
        return Promise.reject(
          new Error('Пользователь с таким номером уже есть')
        )
      }
      const hashedPassword = await hash(password, 10)
      const newUser = await this.query().insert({
        ...userData,
        phone,
        password: hashedPassword,
      })
      return newUser
    } catch (error: any) {
      logger.error(error)
      throw new Error(error)
    }
  }
  static async login(phone:any, password:any){
    
      const user = await User.getUserByPhone(phone, password)
      if (user instanceof Error) {
        return user
      }
      const { ...payload } = user
      // console.log(payload)
      const token = await (jwt as any).sign(payload, signingKey, {
        subject: payload.id.toString(),
        expiresIn: '1d',
      })
      return token
  }

  async getHashByPhone() {
    try {
      const user = await User.findByPhone(this.phone)
      if (!user || user instanceof Error) {
        throw new Error('Пользователь не найден')
      }
      this.hash = user.hash
    } catch (error: any) {
      return new Error(error)
    }
  }

  async passwordCompare() {
    try {
      const user = await User.query().where({ id: this.id }).first()
      if (!user) {
        return new Error('Пользователь не найден')
      }
      return await compare(this.hash, user.hash)
    } catch (error: any) {
      return new Error(error)
    }
  }

  static async isActive(userId: Number): Promise<boolean> {
    const { isActive } = await knex
      .select('isActive')
      .from('users')
      .where('id', userId)
      .first()
    return isActive
  }

  static async getUserByPhone(
    phone: string,
    password: string
  ): Promise<User | Error> {
    try {
      const user = await User.query().withGraphFetched('role').where({ phone }).first()
      if (!user) {
        return new Error('Пользователь не найден')
      }
      const isValid = await compare(password, user.password)
      if (!isValid) {
        return new Error('Неверный пароль')
      }
      return user
    } catch (error: any) {
      return error
    }
  }

  static async getUserById(id: Number) {
    try {
      const user = await User.query().where({ id }).first()
      if (!user) {
        return new Error('Пользователь не найден')
      }
      return user
    } catch (error: any) {
      return new Error(error)
    }
  }

  static async findByPhone(phone: string) {
    try {
      const user = await this.query().where({ phone }).first()
      if (!user) {
        return null
      }
      return user
    } catch (error: any) {
      return new Error(error)
    }
  }

  static async activateUser(id: Number) {
    const isActive = await this.isActive(id)
    // console.log(`[model]: - ${isActive},${id}`)
    const result = await knex('users')
      .where('id', id)
      .update({ isActive: !isActive })
    return { isActive: !isActive }
  }

  static get tableName() {
    return 'users'
  }

  static get idColumn() {
    return 'id'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'phone', 'password', 'role'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        nickname: { type: 'string', maxLength: 255 },
        phone: { type: 'string', minLength: 3, maxLength: 25 },
        role: {
          type: 'string',
          enum: ['admin', 'manager', 'driver'],
          default: 'driver',
        },
        password: { type: 'string', minLength: 1, maxLength: 255 },
        isActive: { type: 'boolean' },
        comment: { type: 'string', maxLength: 255 },
      },
    }
  }

  static get relationMappings() {
    // const users = await User.query()
    //   .withGraphFetched('role')
    //   .where({ isActive: true });
    return {
      role: {
        relation: Model.BelongsToOneRelation,
        modelClass: Role,
        join: {
          from: 'users.roleId',
          to: 'roles.id',
        },
      },
    }
  }
}
export default User