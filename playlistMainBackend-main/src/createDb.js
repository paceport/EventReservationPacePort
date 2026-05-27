//const { Pool } = require('pg');
const { pool } = require("./db");
require("dotenv").config();

// const pool = new Pool({
//   max: 300,
//   connectionTimeoutMillis: 10000,

//   host: process.env.DB_HOST,
//   port: 5432,
//   user: process.env.ADMIN_USERNAME,
//   password: process.env.ADMIN_PWD,
//   database: process.env.DB_NAME,
//   ssl: true,
// });

// const pool = new Pool({
//     max: 300,
//     connectionTimeoutMillis: 5000,

//     host: 'c-playlist-database.gjndzjyoth3a5y.postgres.cosmos.azure.com',
//     port: 5432,
//     user: 'citus',
//     password: 'P!laylist',
//     database: 'playlist-conference-db',
//     ssl: true,
//   });

// Create users table if it doesn't exist
async function createUsersTable() {
  try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
          Empid SERIAL PRIMARY KEY,
          Name VARCHAR(50),
          Email VARCHAR(100) UNIQUE,
          Password JSONB,
          Phone BIGINT UNIQUE
        )
      `);
    console.log("Users table created or already exists.");
  } catch (error) {
    console.error("Error creating users table:", error);
  }
}

// Create events table if it doesn't exist
async function createEventsTable() {
  try {
    await pool.query(`
          CREATE TABLE IF NOT EXISTS events (
              id SERIAL PRIMARY KEY,
              title VARCHAR(255),
              user_id INT REFERENCES users(Empid),
              category_type VARCHAR(50),
              start_datetime TIMESTAMP,
              end_datetime TIMESTAMP,
              participants JSONB,
              location VARCHAR(255),
              logistics_id INT REFERENCES logistics(id),
              published BOOLEAN
              )
          `);
    console.log("Events table created or already exists.");
  } catch (error) {
    console.error("Error creating events table:", error);
  } finally {
    pool.end();
  }
}

async function createLogisticsTable() {
  try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS logistics (
            id SERIAL PRIMARY KEY,
            food_service JSONB,
            agenda JSONB,
            mifi_device BOOLEAN,
            kramer_device BOOLEAN,
            published BOOLEAN
            )
        `);
    console.log("Logistics table created or already exists.");
  } catch (error) {
    console.error("Error creating logistics table:", error);
  } finally {
    pool.end();
  }
}

async function dropTable() {
  try {
    await pool.query(`
          DROP TABLE users, events, logistics
      `);
  } catch (error) {
    console.log(error);
  }
}

// createUsersTable();
// createLogisticsTable();
// createEventsTable();
// dropTable();
