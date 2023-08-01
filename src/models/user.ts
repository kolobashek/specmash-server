import { Model } from 'objection';
import Role from './role'

class User extends Model {
  static get tableName() {
    return 'users';
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
    };
  }
}
export default User