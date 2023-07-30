// src/models/user.js

import db from '../db.js'
import bcrypt from 'bcrypt'

export default class User {
  static async create(name, password, phone, roleId, nickname) {
    // Генерируем salt
    const salt = await bcrypt.genSalt(10)

    // Шифруем пароль
    const hash = await bcrypt.hash(password, salt)

    const [result] = await db.pool.query(
      'INSERT INTO users (name, password, phone, role_id, nickname) VALUES (?, ?, ?, ?, ?)',
      [name, hash, phone, roleId, nickname]
    )

    return result.insertId
  }

  static async #verifyPassword(user, password) {
    return await bcrypt.compare(password, user.password)
  }

  static async loginByPhone(phone, password) {
    const user = await this.findByPhone(phone)
    if (!user) {
      throw new Error('Пользователь не найден')
    }

    const isValid = await this.#verifyPassword(user, password)
    if (!isValid) {
      throw new Error('Неверный пароль')
    }

    return user
  }

  static async findById(id) {
    const [result] = await db.pool.query('SELECT * FROM users WHERE id = ?', [
      id,
    ])
    return result[0]
  }

  static async findByName(name) {
    const [result] = await db.pool.query('SELECT * FROM users WHERE name = ?', [
      name,
    ])
    return result[0]
  }

  static async findByPhone(phone) {
    const [result] = await db.pool.query(
      'SELECT * FROM users WHERE phone = ?',
      [phone]
    )
    return result[0]
  }

  static async findActive() {
    const [result] = await db.pool.query(
      'SELECT * FROM users WHERE isactive = true'
    )
    return result
  }

  static async findByRole(roleId) {
    const [result] = await db.pool.query(
      'SELECT * FROM users WHERE role_id = ?',
      [roleId]
    )
    return result
  }

  static async findAll() {
    const [result] = await db.pool.query('SELECT * FROM users')
    return result
  }

  static async delete(id) {
    const result = await db.pool.query('DELETE FROM users WHERE id = ?', [id])
    return result
  }

  static async update(user) {
    const result = await db.pool.query(
      'UPDATE users SET name = ?, email = ?, phone = ?, role_id = ?, isactive = ? WHERE id = ?',
      [user.name, user.email, user.phone, user.role_id, user.isactive, user.id]
    )
    return result
  }
}
