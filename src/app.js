import express from 'express'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import session from 'express-session'
import sessionConfig from '../config/session.js'
import db from './db.js'
import Router from './routes/auth.js'
import logger from '../config/logger.js'
// import checkAuth from './middlewares/auth.js'

// Добавим body parser
import bodyParser from 'body-parser'

const app = express()
// db.checkDbConnection()
db.initDB()
// db.checkDbConnection();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(Router)
// app.use(checkAuth)

app.use((req, res, next) => {
  logger.info(req.method, req.url);
  next();
});
app.use((err, req, res, next) => {
  logger.error(err);
  next(err);
});
app.use((req, res, next) => {
  const oldSend = res.send;
  res.send = function (data) {
    logger.info(res.statusCode);
    oldSend.call(res, data);
  };
  next();
});

// Инициализируем passport
// app.use(passport.initialize())
// app.use(passport.session())
// app.use(session(sessionConfig));
// app.use(
//   session({
//     secret: 'secret',
//     resave: false,
//     saveUninitialized: true,
//   })
// )

// app.use(function (err, req, res, next) {
//   if (err.name === 'AuthenticationError') {
//     return res.status(401).json({
//       message: err.message,
//     })
//   }

//   return next(err)
// })

export default app
