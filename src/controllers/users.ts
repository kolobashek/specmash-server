// controllers/users.js

import User from '../models/user.ts'
import checkAuth from '../middlewares/auth.ts'

export const registerUser = async (req, res) => {
  const { name, password, phone, roleId, nickname } = req.body
  // Проверка данных регистрации
  if (!phone || !password || !name) {
    return res
      .status(400)
      .json({ message: 'Не указаны телефон, имя или пароль' })
  }
  // Проверка существования пользователя
  const user = await User.findByPhone(phone)
  if (user) {
    return res.status(400).json({ message: 'Пользователь уже существует' })
  } else {
    await User.create(name, password, phone, roleId, nickname)
    res.status(201).json({
      // userId,
      message:
        'Регистрация прошла успешно! Ожидайте подтверждения администратора.',
    })
  }
}

export const loginUser = async (req, res) => {
  const { phone, password } = req.body

  try {
    const user = await User.loginByPhone(phone, password)

    // Проверяем наличие пользователя в БД и совпадение пароля
    if (!user) {
      throw new Error('Неверный логин или пароль')
    }

    // Создаем JWT токен с помощью middleware
    const token = checkAuth(req, res, user.id)

    res.json({ token })
  } catch (err) {
    res.status(401).json({ message: err.message })
  }
}

export const deleteUser = async (userId) => {
  // Получаем пользователя по id
  const user = await User.findById(userId)

  // Проверяем, что пользователь найден
  if (!user) {
    throw new Error('Пользователь не найден')
  }
  // Удаляем пользователя из БД
  await User.deleteOne({ _id: userId })
}

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id)
  res.json(user)
}
