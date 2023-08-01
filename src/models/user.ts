// // src/models/user.js

// import logger from '../config/logger'
// import db from '../db'
// import bcrypt from 'bcrypt'

// export default class User {
//   constructor(name, password, phone, roleId) {
//     this.name = name
//     this.password = password
//     this.phone = phone
//     this.roleId = 3
//   }

//   static async create(name, password, phone, roleId, nickname) {
//     // Генерируем salt
//     const salt = await bcrypt.genSalt(10)

//     // Шифруем пароль
//     const hash = await bcrypt.hash(password, salt)
//     const verifiedRole = roleId || 3
//     const result = await db.pool.query(
//       'INSERT INTO users (name, password, phone, role_id, nickname) VALUES (?, ?, ?, ?, ?)',
//       [name, hash, phone, verifiedRole, nickname]
//     );
//     return result
//   }

//   static async #verifyPassword(user, password) {
//     return await bcrypt.compare(password, user.password)
//   }

//   static async loginByPhone(phone, password) {
//     const user = await this.findByPhone(phone)
//     if (!user) {
//       throw new Error('Пользователь не найден')
//     }

//     const isValid = await this.#verifyPassword(user, password)
//     if (!isValid) {
//       throw new Error('Неверный пароль')
//     }

//     return user
//   }

//   static async findById(id) {
//     const [result] = await db.pool.query('SELECT * FROM users WHERE id = ?', [
//       id,
//     ])
//     return result[0]
//   }

//   static async findByName(name) {
//     const [result] = await db.pool.query('SELECT * FROM users WHERE name = ?', [
//       name,
//     ])
//     return result[0]
//   }

//   static async findByPhone(phone) {
//     try {
//       const [result] = await db.pool.query(
//         'SELECT * FROM users WHERE phone = ?',
//         [phone]
//       )
//       return result
//     } catch (error) {
//       logger.error('Error finding user by phone:', error)
//       throw error
//     }
//   }

//   static async findActive() {
//     const [result] = await db.pool.query(
//       'SELECT * FROM users WHERE isactive = true'
//     )
//     return result
//   }

//   static async findByRole(roleId) {
//     const [result] = await db.pool.query(
//       'SELECT * FROM users WHERE role_id = ?',
//       [roleId]
//     )
//     return result
//   }

//   static async findAll() {
//     const [result] = await db.pool.query('SELECT * FROM users')
//     return result
//   }

//   static async delete(id) {
//     const result = await db.pool.query('DELETE FROM users WHERE id = ?', [id])
//     return result
//   }

//   static async update(user) {
//     const result = await db.pool.query(
//       'UPDATE users SET name = ?, email = ?, phone = ?, role_id = ?, isactive = ? WHERE id = ?',
//       [user.name, user.email, user.phone, user.role_id, user.isactive, user.id]
//     )
//     return result
//   }
// }
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
// models/Role.js
// class Role extends Model {
//   static get tableName() {
//     return 'roles'; 
//   }
// }

// // models/Equipment.js 
// class Equipment extends Model {
//   static get tableName() {
//     return 'equipment';
//   }

//   static get relationMappings() {
//     return {
//       type: {
//         relation: Model.BelongsToOneRelation,
//         modelClass: EquipmentType,
//         join: {
//           from: 'equipment.type_id',
//           to: 'equipment_types.id'
//         }  
//       }
//     }
//   } 
// }