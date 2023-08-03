import { Model } from 'objection';
import { knex } from '../db'
import Role from './role'
import logger from '../config/logger';

interface User {
  id: number
  name: string
  nickname: string
  phone: string
  password: string
  roleId: number
  isActive: boolean
  comment: string
}
class User extends Model implements User {
  static async isActive(userId: Number): Promise<boolean> {
    const { isActive } = await knex.select('isActive').from('users').where('id', userId).first()
    return isActive
  }

  static async activateUser(id: Number) {
    const isActive = await this.isActive(id)
    // console.log(`[model]: - ${isActive},${id}`)
    const result = await knex('users').where('id', id).update({ isActive: !isActive })
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