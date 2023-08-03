import { Model } from 'objection';

class Role extends Model {
  static get tableName() {
    return 'roles'
  }
  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        gender: {
          type: 'string',
          enum: ['Male', 'Female', 'Other'],
          default: 'Female',
        },
      },
    }
  }
}
export default Role