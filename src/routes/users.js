import express from 'express'
import passport from 'passport'
import db from '../db.js'
import checkAuth from '../middlewares/auth.js'
import { register, login, deleteUser } from '../controllers/users.js'

const Router = express.Router()

// Получение всех пользователей
Router.get('/users', async (req, res) => {
  try {
    const users = await db.getAllUsers()
    res.json(users)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})

// Создание нового пользователя
Router.post('/users', async (req, res) => {
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
Router.get('/users', checkAuth, async (req, res) => {
  try {
    const result = await db.pool.query('select * from users')
    res.send(result)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

// Добавление пользователя
Router.put('/users', async (req, res) => {
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
Router.put('/users/:id', async (req, res) => {
  // обновление пользователя в БД
})

// Удаление пользователя
Router.delete('/users/:id', async (req, res) => {
  await deleteUser(req.params.id)
  res.sendStatus(200)
})

// Регистрация пользователя
Router.post('/register', register)

// Роут для активации/деактивации пользователя (поле isactive):
Router.patch('/users/:id/activate', checkAuth, async (req, res) => {
  // изменение isactive
})

Router.post('/login', passport.authenticate('local'), login)

export default Router
