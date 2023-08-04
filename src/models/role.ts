import { Model } from 'objection';

class Role extends Model {
  static get tableName() {
    return 'roles'
  }
  static async getRoleById(id: number) {
    try {
      const role = await this.query().findById(id)
      return role
    } catch (error) {
      return Promise.reject(error)
    }
  }
  static get jsonSchema() {
    return {
      type: 'string',
      enum: ['admin', 'manager', 'driver'],
      default: 'driver',
    }
  }
}
export default Role