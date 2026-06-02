require("dotenv").config({ override: true });

const { Pool } = require("pg");

const dbHost = (process.env.DB_HOST || "localhost").trim();
const dbPort = Number(process.env.DB_PORT || 5432);
const dbUser = (process.env.DB_USER || "postgres").trim();
const dbPassword = process.env.DB_PASSWORD;
const dbName = (process.env.DB_NAME || "playlist_v1").trim();

console.log("Session DB config:", {
  host: dbHost,
  port: dbPort,
  user: dbUser,
  database: dbName,
});

const pool = new Pool({
  max: 300,
  connectionTimeoutMillis: 10000,
  host: dbHost,
  port: dbPort,
  user: dbUser,
  password: dbPassword,
  database: dbName,
  ssl: false,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};