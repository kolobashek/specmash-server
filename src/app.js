import express from 'express'
import { GraphQLServer } from 'graphql-yoga'
import passport from 'passport'
import '../config/passport.js' // импортируем конфигурацию
// import { Strategy as LocalStrategy } from 'passport-local'
// import session from 'express-session'
// import sessionConfig from '../config/session.js'
import { db, initDB } from './db.js'
// import Router from './routes/auth.js'
import logger from '../config/logger.js'
import schema from './schema/user.graphql.js'
// import checkAuth from './middlewares/auth.js'

// Добавим body parser
import bodyParser from 'body-parser'

const app = express()
// db.checkDbConnection()
db.initDB()

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize())
app.use(passport.session())
// app.use(Router)

const server = new GraphQLServer(schema)

server.start(() => console.log('Server is running on localhost:4000'))

app.use('/graphql', server)

// app.use((req, res, next) => {
//   logger.info(req.method, req.url);
//   next();
// });
// app.use((err, req, res, next) => {
//   logger.error(err);
//   next(err);
// });
// app.use((req, res, next) => {
//   const oldSend = res.send;
//   res.send = function (data) {
//     logger.info(res.statusCode);
//     oldSend.call(res, data);
//   };
//   next();
// });

export default app
