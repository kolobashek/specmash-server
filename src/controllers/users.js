// controllers/users.js

import User from '../models/user.js'

export const register = async (req, res) => {
  const { name, password, phone } = req.body

  const user = await User.create(name, password, phone)

  res.json(user)
}

export const login = async (req, res) => {
  // логика аутентификации
}

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id)

  res.json(user)
}
