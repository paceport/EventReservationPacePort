// const { Pool } = require('pg');
// require('dotenv').config();  

// const hostName =  process.env.DB_HOST;
// const userName = process.env.DB_USER;
// const dbName = process.env.DB_NAME;
// const dbPassword = process.env.DB_PASSWORD;

// const pool = new Pool({
//   max: 300,
//   connectionTimeoutMillis: 10000,

//   host: hostName,
//   port: 5432,
//   user: userName,
//   password: dbPassword,
//   database: dbName,
//   ssl: true,
// });


// async function queryDatabase() {
//     // const queryString = `
//     //   DROP TABLE IF EXISTS media;
//     //   CREATE TABLE media (event_id text, fileName text, caption text, fileType text, mediaUrl text);
//     //   CREATE INDEX idx_event_id ON media(event_id);
//     // `;
//     const queryString = `      
//         DROP TABLE IF EXISTS sessions cascade;  
//         DROP TABLE IF EXISTS employee;    
        
//         CREATE TABLE EMPLOYEE (
//             empID INTEGER PRIMARY KEY,
//             empName VARCHAR(100),
//             empRole VARCHAR(100)
//         );

//         CREATE TABLE SESSIONS (
//             sessionID VARCHAR(50) PRIMARY KEY,
//             empID INTEGER,
//             SessionName TEXT,  
//             DetailedBannerText TEXT,  
//             DetailedText TEXT,  
//             DetailedImageUrl TEXT,  
//             DetailedVideoUrl TEXT,    
//             OverviewCategory TEXT,  
//             OverviewDuration INTEGER,  
//             OverviewText TEXT,  
//             OverviewImageUrl TEXT,  
//             FOREIGN KEY (empId) REFERENCES EMPLOYEE (empID)  
//         ); 
//         `;  
   
//     try {
//       await pool.query(queryString);
//       console.log('Created the media table');
//     } catch (err) {
//       console.log(err.stack);
//     } finally {
//       pool.end();
//     }
//   }
  
//   // queryDatabase();

// module.exports = {
//     query: (text, params) => pool.query(text, params)
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
  database: process.env.DB_NAME || "playlist_v1",
  ssl: false,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};