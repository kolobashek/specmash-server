// Импорты
import express from 'express'
import passport from 'passport'
import { registerUser, loginUser } from '../controllers/auth.js'

const router = express.Router()

// Регистрация пользователя
router.post('/register', registerUser)

// Авторизация пользователя
router.post('/login', passport.authenticate('local'), loginUser)

export default router
