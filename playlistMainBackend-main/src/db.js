// const { Pool } = require("pg");
// require("dotenv").config();

// // const pool = new Pool({
// //   max: 300,
// //   connectionTimeoutMillis: 10000,
// //   host: process.env.DB_HOST,
// //   port: 5432,
// //   user: process.env.ADMIN_USERNAME,
// //   password: process.env.ADMIN_PWD,
// //   database: process.env.DB_NAME,
// //   ssl: true,
// // });

// const pool = new Pool({
//   max: 300,
//   connectionTimeoutMillis: 5000,
//   host: "c-playlist-database.gjndzjyoth3a5y.postgres.cosmos.azure.com",
//   port: 5432,
//   user: "citus",
//   password: "P@ceport@123",
//   database: "playlist-conference-db",
//   ssl: true,
// });

// module.exports = {
//   pool,
//   query: (text, params) => pool.query(text, params),
// };
require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  max: 300,
  connectionTimeoutMillis: 10000,
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "playlist_v2",
  ssl: false,
});

module.exports = {
  pool,
  query: (text, params) => pool.query(text, params),
};