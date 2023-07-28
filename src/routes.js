import express from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken';
import db from './db.js'

const router = express.Router()

function authenticateToken (req, res, next) {
  // проверка токена
  const token = req.header('Authorization').replace('Bearer ', '')
  const isValid = jwt.verify(token, 'secret')
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid token' })
  }
  next()
}

// Получение всех пользователей
router.get('/users', async (req, res) => {
  try {
    const users = await db.getAllUsers()
    res.json(users)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})

// Создание нового пользователя
router.post('/users', async (req, res) => {
  try {
    const user = req.body
    await db.createUser(user)
    res.sendStatus(201)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})
// GET
router.get('/users', authenticateToken, async (req, res) => {
  try {
    const result = await db.pool.query('select * from users')
    res.send(result)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

// Добавление пользователя
router.put('/users', async (req, res) => {
  const sql = 'INSERT INTO users SET ?'
  try {
    await db.pool.query(sql, [req.body])
    res.sendStatus(201)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

// обновление пользователя в БД
router.put('/users/:id', async (req, res) => {
  // обновление пользователя в БД
})

// Удаление пользователя
router.delete('/users/:id', async (req, res) => {
  const userId = req.params.id
  const sql = 'DELETE FROM users WHERE id = ?'
  try {
    await db.pool.query(sql, [userId])
    res.sendStatus(200)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

// Роут для активации/деактивации пользователя (поле isactive):
router.patch('/users/:id/activate', async (req, res) => {
  // изменение isactive
})

router.post('/register', passport.authenticate('local'), (req, res) => {
  // регистрация и выдача JWT
})

router.post('/login', passport.authenticate('local'), (req, res) => {
  // выдача токена
})

export default router
