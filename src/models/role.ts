import { Model } from 'objection';

class Role extends Model {
  static get tableName() {
    return 'roles'
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