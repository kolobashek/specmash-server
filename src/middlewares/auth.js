import jwt from 'jsonwebtoken'

export default function checkAuth(req, res, next) {
  // Получаем токен из заголовка Authorization
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Токен не предоставлен' })
  }

  try {
    // Верифицируем токен
    const decoded = jwt.verify(token, 'secret')

    // Добавляем данные пользователя в объект запроса
    req.user = decoded
  } catch (err) {
    return res
      .status(401)
      .json({ message: 'Неверный аутентификационный токен' })
  }

  // Пропускаем запрос дальше
  return next()
}
