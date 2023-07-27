import express from "express";
import db from "./db.js";

const router = express.Router();

// Получение всех пользователей
router.get("/users", async (req, res) => {
  try {
    const users = await db.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Создание нового пользователя
router.post("/users", async (req, res) => {
  try {
    const user = req.body;
    await db.createUser(user);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
// GET
app.get("/users", authenticateToken, async (req, res) => {
  try {
    const result = await db.pool.query("select * from users");
    res.send(result);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// Добавление пользователя
app.put("/users", async (req, res) => {
  const sql = "INSERT INTO users SET ?";
  try {
    await db.pool.query(sql, [req.body]);
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// обновление пользователя в БД
app.put("/users/:id", async (req, res) => {
  // обновление пользователя в БД
});

// Удаление пользователя
app.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;
  const sql = "DELETE FROM users WHERE id = ?";
  try {
    await db.pool.query(sql, [userId]);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// Роут для активации/деактивации пользователя (поле isactive):
app.patch("/users/:id/activate", async (req, res) => {
  // изменение isactive
});

app.post("/register", passport.authenticate("local"), (req, res) => {
  // регистрация и выдача JWT
});

app.post("/login", passport.authenticate("local"), (req, res) => {
  // выдача токена
});

export default router;
