// Use the MariaDB Node.js Connector
import mariadb from "mariadb";
import winston from "winston";
import * as dotenv from "dotenv";

dotenv.config();
const logger = winston.createLogger({
  // настройки логгера
  transports: [new winston.transports.Console()],
});

// Create a connection pool
const connectionSettings = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
};
const pool = mariadb.createPool(connectionSettings);

// Проверка подключения
async function checkDbConnection() {
  try {
    await pool.getConnection();
    console.log("Connected to database");
  } catch (err) {
    console.error("Error connecting to database:", err);
  }
}

export default {
  pool,
  checkDbConnection,
  initDB,
};

export async function initDB() {
  // Проверка таблицы roles
  const rolesExists = await pool.query(`SHOW TABLES LIKE 'roles'`);
  if (!rolesExists.length) {
    await pool.query(`
      CREATE TABLE roles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL  
      )
    `);
  }
  // Проверяем, есть ли таблица users
  const usersExists = await pool.query(`SHOW TABLES LIKE 'users'`);
  if (!usersExists.length) {
    await pool.query(`
      CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY, 
        phone VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        role_id INT NOT NULL,
        isactive BOOLEAN NOT NULL DEFAULT TRUE,
        FOREIGN KEY (role_id) REFERENCES roles(id)
      )
    `);
  }

  // Таблица для типов техники
  const equipment_typesExists = await pool.query(
    `SHOW TABLES LIKE 'equipment_types'`
  );
  if (!equipment_typesExists.length) {
    await pool.query(`
        CREATE TABLE equipment_types (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL
        )
      `);
  }

  // Таблица для списка техники
  const equipmentExists = await pool.query(`SHOW TABLES LIKE 'equipment'`);
  if (!equipmentExists.length) {
    await pool.query(`
      CREATE TABLE equipment (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type_id INT,
        name VARCHAR(255) NOT NULL, 
        dimensions VARCHAR(255),
        weight INT, 
        license_plate VARCHAR(255),
        nickname VARCHAR(255),
        FOREIGN KEY (type_id) REFERENCES equipment_types(id)
      )
      `);
  }

  const objectsExists = await pool.query(`SHOW TABLES LIKE 'objects'`);
  if (!objectsExists.length) {
    // Таблица для объектов
    await pool.query(`
      CREATE TABLE objects (
        id INT AUTO_INCREMENT PRIMARY KEY, 
        name VARCHAR(255) NOT NULL,
        contacts VARCHAR(255),
        address VARCHAR(255)
      )
    `);
  }

  const travel_logsExists = await pool.query(
    `SHOW TABLES LIKE 'travel_logs'`
  );
  if (!travel_logsExists.length) {
    // Таблица для путевых листов
    await pool.query(`
      CREATE TABLE travel_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        date DATE,
        shift_number INT,
        driver_id INT,
        object_id INT,
        equipment_id INT,
        hours_worked INT, 
        hours_idle INT,
        comments TEXT,
        FOREIGN KEY (driver_id) REFERENCES users(id),
        FOREIGN KEY (object_id) REFERENCES objects(id),
        FOREIGN KEY (equipment_id) REFERENCES equipment(id)
      )
    `);
  }
}
