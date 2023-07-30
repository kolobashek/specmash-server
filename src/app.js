import express from 'express'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import db from './db.js'
import Router from './routes/users.js'
import checkAuth from './middlewares/auth.js'

// Добавим body parser
import bodyParser from 'body-parser'

const app = express()
db.checkDbConnection()
db.initDB()
// db.checkDbConnection();

app.use(Router)
app.use(checkAuth)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:19006')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

// Инициализируем passport
app.use(passport.initialize())
app.use(passport.session())
// app.use(
//   session({
//     secret: 'secret',
//     resave: false,
//     saveUninitialized: true,
//   })
// )
// Определим стратегию LocalStrategy
passport.use(
  new LocalStrategy(function (username, password, done) {
    // Проверка логина и пароля
    // User.findOne({ username }, function (err, user) {
    //   if (err) {
    //     return done(err)
    //   }
    //   if (!user) {
    //     return done(null, false)
    //   }
    //   if (!user.verifyPassword(password)) {
    //     return done(null, false)
    //   }
    //   return done(null, user)
    // })
  })
)

app.use(function (err, req, res, next) {
  if (err.name === 'AuthenticationError') {
    return res.status(401).json({
      message: err.message,
    })
  }

  return next(err)
})

export default app
