import express from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import db from "./db.js";
import router from "./routes.js";

const app = express();
db.checkDbConnection();
db.initDB();
// db.checkDbConnection();

app.use(router);

// Добавим body parser
import bodyParser from "body-parser";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Инициализируем passport
app.use(passport.initialize());
app.use(passport.session());

// Определим стратегию LocalStrategy
passport.use(
  new LocalStrategy(function (username, password, done) {
    // ...
  })
);

export default app;
