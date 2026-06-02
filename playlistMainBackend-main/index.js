// // const express = require("express");
// // const db = require("./src/db");
// // const app = express();
// // const cors = require("cors");
// // const swaggerJsDoc = require("swagger-jsdoc");
// // const swaggerUi = require("swagger-ui-express");
// // app.use(express.json());
// // const crypto = require("crypto");

// // //const dataBase = require("./createDb");

// // const corsOptions = {
// //   origin: true,
// //   methods: ["GET, POST"],
// //   credentials: true,
// // };

// // app.use(cors(corsOptions));

// // // Swagger configuration
// // const swaggerOptions = {
// //   swaggerDefinition: {
// //     openapi: "3.0.0",
// //     info: {
// //       title: "Event Management API",
// //       version: "1.0.0",
// //       description: "API for managing users, events, and logistics",
// //       contact: {
// //         name: "Developer",
// //         email: "developer@example.com"
// //       },
// //       servers: [
// //         {
// //           url: "http://localhost:4000",
// //           description: "Local server"
// //         }
// //       ]
// //     }
// //   },
// //   apis: ["./index.js"] // Path to the API docs
// // };

// // const swaggerDocs = swaggerJsDoc(swaggerOptions);
// // app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// // function generatePassword(password) {
// //   const salt = crypto.randomBytes(32).toString("hex");
// //   const genHash = crypto
// //     .pbkdf2Sync(password, salt, 10000, 64, "sha512")
// //     .toString("hex");
// //   return {
// //     salt: salt,
// //     hash: genHash,
// //   };
// // }

// // /**
// //  * @swagger
// //  * /table:
// //  *   get:
// //  *     summary: Retrieve all users
// //  *     responses:
// //  *       200:
// //  *         description: Successfully retrieved users
// //  *       500:
// //  *         description: Internal Server Error
// //  */
// // app.get("/table", async (req, res) => {
// //   try {
// //     const display = await db.query("SELECT * FROM users");
// //     res.json(display.rows);
// //   } catch (error) {
// //     console.error(error);
// //   }
// // });

// // /**
// //  * @swagger
// //  * /signup:
// //  *   post:
// //  *     summary: Sign up a new user
// //  *     requestBody:
// //  *       required: true
// //  *       content:
// //  *         application/json:
// //  *           schema:
// //  *             type: object
// //  *             properties:
// //  *               empid:
// //  *                 type: string
// //  *               name:
// //  *                 type: string
// //  *               email:
// //  *                 type: string
// //  *               password:
// //  *                 type: string
// //  *               phone:
// //  *                 type: string
// //  *     responses:
// //  *       201:
// //  *         description: Successfully signed up
// //  *       500:
// //  *         description: Internal Server Error
// //  */
// // app.post("/signup", async (req, res) => {
// //   try {
// //     const payload = req.body;
// //     const password = generatePassword(payload.password);
// //     await db.query(
// //       "INSERT INTO users (Empid, Name, Email, Password, Phone) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (empID)  DO UPDATE SET  Name = EXCLUDED.Name,  Email = EXCLUDED.Email, Phone = EXCLUDED.Phone",
// //       [
// //         payload.empid,
// //         payload.name,
// //         payload.email,
// //         JSON.stringify(password),
// //         payload.phone,
// //       ]
// //     );
// //     const response = { message: "Successfully Signed Up", status: 201 };
// //     res.json(response).status(201);
// //   } catch (error) {
// //     console.error(error);
// //   }
// // });

// // function validatePassword(password, salt, hash) {
// //   const checkPassword = crypto
// //     .pbkdf2Sync(password, salt, 10000, 64, "sha512")
// //     .toString("hex");
// //   return hash === checkPassword;
// // }

// // /**
// //  * @swagger
// //  * /login:
// //  *   post:
// //  *     summary: Log in a user
// //  *     requestBody:
// //  *       required: true
// //  *       content:
// //  *         application/json:
// //  *           schema:
// //  *             type: object
// //  *             properties:
// //  *               email:
// //  *                 type: string
// //  *               password:
// //  *                 type: string
// //  *     responses:
// //  *       200:
// //  *         description: Successfully logged in
// //  *       401:
// //  *         description: User is not valid
// //  *       500:
// //  *         description: Internal Server Error
// //  */
// // app.post("/login", async (req, res) => {
// //   try {
// //     const payload = req.body;
// //     const result = await db.query("SELECT * FROM users WHERE Email = $1 ", [
// //       payload.email,
// //     ]);
// //     const storedSalt = result.rows[0].password.salt;
// //     const storedHash = result.rows[0].password.hash;
// //     const isValidUser = validatePassword(
// //       payload.password,
// //       storedSalt,
// //       storedHash
// //     );

// //     if (isValidUser) {
// //       const response = { message: "Successfully Logged in", status: 200 };
// //       res.json(response).status(200);
// //     } else {
// //       const response = { message: "User is not Valid", status: 401 };
// //       res.json(response).status(401);
// //     }
// //   } catch (error) {
// //     console.error(error);
// //   }
// // });

// // /**
// //  * @swagger
// //  * /:
// //  *   get:
// //  *     summary: Retrieve all events
// //  *     responses:
// //  *       200:
// //  *         description: Successfully retrieved events
// //  *       500:
// //  *         description: Internal Server Error
// //  */
// // app.get("/", async (req, res) => {
// //   try {
// //     const time = new Date().toISOString();
// //     const result = await db.query(
// //       "SELECT * FROM events ORDER BY start_datetime DESC"
// //     );

// //     res.json(result.rows);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).send("Internal Server Error");
// //   }
// // });

// // /**
// //  * @swagger
// //  * /logistics:
// //  *   get:
// //  *     summary: Retrieve all logistics
// //  *     responses:
// //  *       200:
// //  *         description: Successfully retrieved logistics
// //  *       500:
// //  *         description: Internal Server Error
// //  */
// // //for logistics table:
// // app.get("/logistics", async (req, res) => {
// //   try {
// //     const result = await db.query("SELECT * FROM logistics");

// //     res.json(result.rows);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).send("Internal Server Error");
// //   }
// // });

// // /**
// //  * @swagger
// //  * /date:
// //  *   get:
// //  *     summary: Retrieve events within a date range
// //  *     parameters:
// //  *       - in: query
// //  *         name: start_datetime
// //  *         schema:
// //  *           type: string
// //  *           format: date-time
// //  *         required: true
// //  *         description: The start date and time
// //  *       - in: query
// //  *         name: end_datetime
// //  *         schema:
// //  *           type: string
// //  *           format: date-time
// //  *         required: true
// //  *         description: The end date and time
// //  *     responses:
// //  *       200:
// //  *         description: Successfully retrieved events within the date range
// //  *       500:
// //  *         description: Internal Server Error
// //  */
// // app.get("/date", async (req, res) => {
// //   try {
// //     const start_date = new Date(req.query.start_datetime);
// //     const end_date = new Date(req.query.end_datetime);

// //     const iso_start_date = start_date.toISOString();
// //     const iso_end_date = end_date.toISOString();

// //     const result = await db.query(
// //       "SELECT * FROM events WHERE events.start_datetime BETWEEN $1 AND $2 ORDER BY events.start_datetime DESC",
// //       [iso_start_date, iso_end_date]
// //     );

// //     res.json(result.rows);
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).send("Internal Server Error");
// //   }
// // });

// // /**
// //  * @swagger
// //  * /delete/{id}:
// //  *   delete:
// //  *     summary: Delete an event by ID
// //  *     parameters:
// //  *       - in: path
// //  *         name: id
// //  *         schema:
// //  *           type: integer
// //  *         required: true
// //  *         description: The ID of the event to delete
// //  *     responses:
// //  *       200:
// //  *         description: Successfully deleted the event
// //  *       500:
// //  *         description: Internal Server Error
// //  */
// // app.delete("/delete/:id", async (req, res) => {
// //   try {
// //     const { id } = req.params;

// //     const result = await db.query("DELETE FROM events WHERE id = $1", [id]);
// //     res.json(result);
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).send("Internal Server Error");
// //   }
// // });

// // /**
// //  * @swagger
// //  * /events:
// //  *   post:
// //  *     summary: Create a new event
// //  *     requestBody:
// //  *       required: true
// //  *       content:
// //  *         application/json:
// //  *           schema:
// //  *             type: object
// //  *             properties:
// //  *               title:
// //  *                 type: string
// //  *               user_id:
// //  *                 type: integer
// //  *               category_type:
// //  *                 type: string
// //  *               start_datetime:
// //  *                 type: string
// //  *                 format: date-time
// //  *               end_datetime:
// //  *                 type: string
// //  *                 format: date-time
// //  *               participants:
// //  *                 type: array
// //  *                 items:
// //  *                   type: string
// //  *               location:
// //  *                 type: string
// //  *               food_service:
// //  *                 type: object
// //  *               agenda:
// //  *                 type: object
// //  *               has_mifi_device:
// //  *                 type: boolean
// //  *               has_kramer_device:
// //  *                 type: boolean
// //  *               published:
// //  *                 type: boolean
// //  *     responses:
// //  *       201:
// //  *         description: Successfully created an event
// //  *       500:
// //  *         description: Internal Server Error
// //  */
// // app.post("/events", async (req, res) => {
// //   const {
// //     title,
// //     user_id,
// //     category_type,
// //     start_datetime,
// //     end_datetime,
// //     participants,
// //     location,
// //     food_service,
// //     agenda,
// //     has_mifi_device,
// //     has_kramer_device,
// //     published,
// //   } = req.body;
// //   try {
// //     const logistics = await db.query(
// //       `INSERT INTO logistics (food_service, agenda, mifi_device, kramer_device, published)
// //           VALUES ($1, $2, $3, $4, $5) RETURNING *`,
// //       [
// //         JSON.stringify(food_service),
// //         JSON.stringify(agenda),
// //         has_mifi_device,
// //         has_kramer_device,
// //         published,
// //       ]
// //     );
// //     const logisticsId = logistics.rows[0].id;
// //     const result = await db.query(
// //       `INSERT INTO events (title, user_id, category_type, start_datetime, end_datetime, participants, location, published, logistics_id) 
// //           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
// //       [
// //         title,
// //         user_id,
// //         category_type,
// //         start_datetime,
// //         end_datetime,
// //         JSON.stringify(participants),
// //         location,
// //         published,
// //         logisticsId,
// //       ]
// //     );
// //     res.status(201).json(result.rows[0]);
// //   } catch (error) {
// //     console.error("Error executing query", error.stack);
// //     res.status(500).send("Internal Server Error");
// //   }
// // });

// // /**
// //  * @swagger
// //  * /events/{id}:
// //  *   put:
// //  *     summary: Update an existing event
// //  *     parameters:
// //  *       - in: path
// //  *         name: id
// //  *         schema:
// //  *           type: integer
// //  *         required: true
// //  *         description: The ID of the event to update
// //  *     requestBody:
// //  *       required: true
// //  *       content:
// //  *         application/json:
// //  *           schema:
// //  *             type: object
// //  *             properties:
// //  *               title:
// //  *                 type: string
// //  *               user_id:
// //  *                 type: integer
// //  *               category_type:
// //  *                 type: string
// //  *               start_datetime:
// //  *                 type: string
// //  *                 format: date-time
// //  *               end_datetime:
// //  *                 type: string
// //  *                 format: date-time
// //  *               participants:
// //  *                 type: array
// //  *                 items:
// //  *                   type: string
// //  *               location:
// //  *                 type: string
// //  *               published:
// //  *                 type: boolean
// //  *     responses:
// //  *       200:
// //  *         description: Successfully updated the event
// //  *       404:
// //  *         description: Event not found
// //  *       500:
// //  *         description: Internal Server Error
// //  */
// // // PUT Route: Update an existing event
// // app.put("/events/:id", async (req, res) => {
// //   const { id } = req.params;
// //   const {
// //     title,
// //     user_id,
// //     category_type,
// //     start_datetime,
// //     end_datetime,
// //     participants,
// //     location,
// //     published,
// //   } = req.body;
// //   try {
// //     const result = await db.query(
// //       `UPDATE events 
// //           SET title = $1, user_id = $2, category_type = $3, start_datetime = $4, end_datetime = $5, participants = $6, location = $7, published = $8 
// //           WHERE id = $9 RETURNING *`,
// //       [
// //         title,
// //         user_id,
// //         category_type,
// //         start_datetime,
// //         end_datetime,
// //         JSON.stringify(participants),
// //         location,
// //         published,
// //         id,
// //       ]
// //     );
// //     if (result.rowCount === 0) {
// //       res.status(404).send("Event not found");
// //     } else {
// //       res.json(result.rows[0]);
// //     }
// //   } catch (error) {
// //     console.error("Error executing query", error.stack);
// //     res.status(500).send("Internal Server Error");
// //   }
// // });

// // // Port configuration: use environment variable or fallback to default
// // const PORT = process.env.PORT || 4000;

// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// // });



// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const crypto = require("crypto");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const swaggerJsDoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");
// const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");

// const db = require("./src/db");

// const app = express();

// app.use(express.json({ limit: "50mb" }));
// app.use(cors({ origin: true, credentials: true }));

// /**
//  * ============================================
//  * AWS SES CONFIG
//  * ============================================
//  * Uses EC2 IAM Role automatically when deployed on EC2.
//  * Do not add AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY in .env for production.
//  */
// const sesClient = new SESClient({
//   region: process.env.AWS_REGION || "us-east-1",
// });

// async function sendOtpEmail({ to, otp, purpose }) {
//   if (!process.env.SES_FROM_EMAIL) {
//     throw new Error("SES_FROM_EMAIL is missing in environment variables");
//   }

//   const isRegistration = purpose === "registration";

//   const subject = isRegistration
//     ? "Verify your registration OTP"
//     : "Your password reset OTP";

//   const textBody = isRegistration
//     ? `Your registration OTP is ${otp}. This OTP will expire in 10 minutes. Do not share it with anyone.`
//     : `Your password reset OTP is ${otp}. This OTP will expire in 10 minutes. Do not share it with anyone.`;

//   const htmlBody = `
//     <div style="font-family: Arial, sans-serif; line-height: 1.6;">
//       <h2>${subject}</h2>
//       <p>Your OTP code is:</p>
//       <h1 style="letter-spacing: 4px;">${otp}</h1>
//       <p>This OTP will expire in <strong>10 minutes</strong>.</p>
//       <p>Do not share this OTP with anyone.</p>
//     </div>
//   `;

//   const command = new SendEmailCommand({
//     Source: process.env.SES_FROM_EMAIL,
//     Destination: {
//       ToAddresses: [to],
//     },
//     Message: {
//       Subject: {
//         Data: subject,
//         Charset: "UTF-8",
//       },
//       Body: {
//         Text: {
//           Data: textBody,
//           Charset: "UTF-8",
//         },
//         Html: {
//           Data: htmlBody,
//           Charset: "UTF-8",
//         },
//       },
//     },
//   });

//   await sesClient.send(command);
// }

// /**
//  * ============================================
//  * SWAGGER CONFIG
//  * ============================================
//  */
// const swaggerOptions = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Playlist Event Management API",
//       version: "1.0.0",
//       description:
//         "API documentation for Playlist Reservation Management System",
//     },
//     servers: [
//       {
//         url: "http://localhost:4000",
//       },
//     ],
//     components: {
//       securitySchemes: {
//         bearerAuth: {
//           type: "http",
//           scheme: "bearer",
//           bearerFormat: "JWT",
//         },
//       },
//       schemas: {
//         User: {
//           type: "object",
//           properties: {
//             empid: { type: "integer", example: 1 },
//             name: { type: "string", example: "Test User" },
//             email: { type: "string", example: "test@example.com" },
//             phone: { type: "string", example: "1234567890" },
//           },
//         },
//         Event: {
//           type: "object",
//           properties: {
//             id: { type: "integer", example: 1 },
//             title: { type: "string", example: "AI Workshop" },
//             user_id: { type: "integer", example: 1 },
//             category_type: { type: "string", example: "Workshop" },
//             start_datetime: {
//               type: "string",
//               format: "date-time",
//               example: "2026-05-27T09:00:00.000Z",
//             },
//             end_datetime: {
//               type: "string",
//               format: "date-time",
//               example: "2026-05-27T12:00:00.000Z",
//             },
//             participants: { type: "array", items: { type: "string" } },
//             location: { type: "string", example: "TCS Paceport" },
//             logistics_id: { type: "integer", example: 1 },
//             published: { type: "boolean", example: true },
//           },
//         },
//         Logistics: {
//           type: "object",
//           properties: {
//             id: { type: "integer", example: 1 },
//             food_service: { type: "object" },
//             agenda: { type: "object" },
//             mifi_device: { type: "boolean", example: true },
//             kramer_device: { type: "boolean", example: false },
//             published: { type: "boolean", example: true },
//           },
//         },
//       },
//     },
//   },
//   apis: ["./index.js"],
// };

// const swaggerSpec = swaggerJsDoc(swaggerOptions);

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.get("/swagger.json", (req, res) => {
//   res.setHeader("Content-Type", "application/json");
//   res.send(swaggerSpec);
// });

// /**
//  * ============================================
//  * PASSWORD HELPERS
//  * ============================================
//  */
// function generatePassword(password) {
//   const salt = crypto.randomBytes(32).toString("hex");
//   const hash = crypto
//     .pbkdf2Sync(password, salt, 10000, 64, "sha512")
//     .toString("hex");
//   return { salt, hash };
// }

// function validatePassword(password, salt, hash) {
//   const checkPassword = crypto
//     .pbkdf2Sync(password, salt, 10000, 64, "sha512")
//     .toString("hex");
//   return hash === checkPassword;
// }

// function createToken(user) {
//   return jwt.sign(
//     {
//       empid: user.empid,
//       email: user.email,
//       name: user.name,
//     },
//     process.env.JWT_SECRET || "local-dev-secret",
//     { expiresIn: "1d" }
//   );
// }

// function generateOtp() {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// }

// function getOtpExpiryDate() {
//   return new Date(Date.now() + 10 * 60 * 1000);
// }

// /**
//  * ============================================
//  * HEALTH
//  * ============================================
//  */

// /**
//  * @swagger
//  * /health:
//  *   get:
//  *     summary: Health check
//  *     tags:
//  *       - Health
//  *     responses:
//  *       200:
//  *         description: Backend is running
//  *         content:
//  *           application/json:
//  *             example:
//  *               message: V2 backend is running
//  *               status: 200
//  */
// app.get("/health", (req, res) => {
//   res.json({ message: "V2 backend is running", status: 200 });
// });

// /**
//  * ============================================
//  * AUTH HANDLERS
//  * ============================================
//  */
// async function signupHandler(req, res) {
//   try {
//     const payload = req.body;

//     if (!payload.empid || !payload.name || !payload.email || !payload.password) {
//       return res.status(400).json({
//         message: "Employee ID, name, email and password are required",
//         status: 400,
//       });
//     }

//     const normalizedEmail = payload.email.trim().toLowerCase();

//     const existingUser = await db.query(
//       "SELECT empid, email FROM users WHERE LOWER(email) = $1 OR empid = $2",
//       [normalizedEmail, payload.empid]
//     );

//     if (existingUser.rows.length > 0) {
//       return res.status(409).json({
//         message: "User already exists with this email or employee ID",
//         status: 409,
//       });
//     }

//     const password = generatePassword(payload.password);
//     const signupOtp = generateOtp();
//     const signupOtpHash = await bcrypt.hash(signupOtp, 10);
//     const signupOtpExpiresAt = getOtpExpiryDate();

//     await db.query(
//       `
//       INSERT INTO pending_registrations
//         (empid, name, email, password, phone, otp_hash, expires_at, verified, attempts)
//       VALUES
//         ($1, $2, $3, $4, $5, $6, $7, false, 0)
//       ON CONFLICT (email)
//       DO UPDATE SET
//         empid = EXCLUDED.empid,
//         name = EXCLUDED.name,
//         password = EXCLUDED.password,
//         phone = EXCLUDED.phone,
//         otp_hash = EXCLUDED.otp_hash,
//         expires_at = EXCLUDED.expires_at,
//         verified = false,
//         attempts = 0,
//         created_at = CURRENT_TIMESTAMP
//       RETURNING *
//       `,
//       [
//         payload.empid,
//         payload.name,
//         normalizedEmail,
//         JSON.stringify(password),
//         payload.phone || null,
//         signupOtpHash,
//         signupOtpExpiresAt,
//       ]
//     );

//     await sendOtpEmail({
//       to: normalizedEmail,
//       otp: signupOtp,
//       purpose: "registration",
//     });

//     res.status(201).json({
//       message: "OTP sent successfully. Please check your email.",
//       status: 201,
//       email: normalizedEmail,
//       empid: payload.empid,
//     });
//   } catch (error) {
//     console.error("Signup error:", error);
//     res.status(500).json({
//       message: "Signup failed",
//       status: 500,
//       error: error.message,
//     });
//   }
// }

// async function loginHandler(req, res) {
//   try {
//     const payload = req.body;

//     const result = await db.query("SELECT * FROM users WHERE LOWER(email) = $1", [
//       payload.email.trim().toLowerCase(),
//     ]);

//     if (result.rows.length === 0) {
//       return res.status(401).json({ message: "User is not valid", status: 401 });
//     }

//     const user = result.rows[0];
//     const storedPassword = user.password;

//     const isValidUser = validatePassword(
//       payload.password,
//       storedPassword.salt,
//       storedPassword.hash
//     );

//     if (!isValidUser) {
//       return res.status(401).json({ message: "User is not valid", status: 401 });
//     }

//     const token = createToken(user);

//     res.status(200).json({
//       message: "Successfully Logged in",
//       status: 200,
//       token,
//       user: {
//         empid: user.empid,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//       },
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Login failed", error: error.message });
//   }
// }

// /**
//  * ============================================
//  * AUTH ROUTES
//  * ============================================
//  */

// /**
//  * @swagger
//  * /api/auth/signup:
//  *   post:
//  *     summary: Register a new user and send registration OTP by email
//  *     tags:
//  *       - Auth
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required: [empid, name, email, password]
//  *             properties:
//  *               empid:
//  *                 type: integer
//  *                 example: 1001
//  *               name:
//  *                 type: string
//  *                 example: Test User
//  *               email:
//  *                 type: string
//  *                 example: test@example.com
//  *               password:
//  *                 type: string
//  *                 example: password123
//  *               phone:
//  *                 type: string
//  *                 example: "9876543210"
//  *     responses:
//  *       201:
//  *         description: OTP sent successfully to email
//  *         content:
//  *           application/json:
//  *             example:
//  *               message: OTP sent successfully. Please check your email.
//  *               status: 201
//  *               email: test@example.com
//  *               empid: 1001
//  *       400:
//  *         description: Missing required fields
//  *       409:
//  *         description: User already exists
//  *       500:
//  *         description: Server error
//  */
// app.post("/signup", signupHandler);
// app.post("/api/auth/signup", signupHandler);
// app.post("/api/auth/register", signupHandler);

// /**
//  * @swagger
//  * /api/auth/login:
//  *   post:
//  *     summary: Login user and get JWT token
//  *     tags:
//  *       - Auth
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required: [email, password]
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 example: test@example.com
//  *               password:
//  *                 type: string
//  *                 example: password123
//  *     responses:
//  *       200:
//  *         description: Login successful — returns JWT token
//  *         content:
//  *           application/json:
//  *             example:
//  *               message: Successfully Logged in
//  *               status: 200
//  *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
//  *               user:
//  *                 empid: 1
//  *                 name: Test User
//  *                 email: test@example.com
//  *       401:
//  *         description: Invalid credentials
//  *       500:
//  *         description: Server error
//  */
// app.post("/login", loginHandler);
// app.post("/api/auth/login", loginHandler);

// /**
//  * @swagger
//  * /api/auth/forgot-password:
//  *   post:
//  *     summary: Send OTP by email for password reset
//  *     tags:
//  *       - Auth
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - email
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 example: test@example.com
//  *     responses:
//  *       200:
//  *         description: OTP sent successfully to email
//  *         content:
//  *           application/json:
//  *             example:
//  *               message: OTP sent successfully. Please check your email.
//  *               status: 200
//  *       400:
//  *         description: Email is required
//  *         content:
//  *           application/json:
//  *             example:
//  *               message: Email is required
//  *               status: 400
//  *       404:
//  *         description: User not found
//  *         content:
//  *           application/json:
//  *             example:
//  *               message: User not found with this email
//  *               status: 404
//  *       500:
//  *         description: Failed to send OTP
//  *         content:
//  *           application/json:
//  *             example:
//  *               message: Failed to send OTP
//  *               status: 500
//  */
// app.post("/api/auth/forgot-password", async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({
//         message: "Email is required",
//         status: 400,
//       });
//     }

//     const normalizedEmail = email.trim().toLowerCase();

//     const userResult = await db.query(
//       "SELECT empid, email FROM users WHERE LOWER(email) = $1",
//       [normalizedEmail]
//     );

//     if (userResult.rows.length === 0) {
//       return res.status(404).json({
//         message: "User not found with this email",
//         status: 404,
//       });
//     }

//     const otp = generateOtp();
//     const otpHash = await bcrypt.hash(otp, 10);
//     const expiresAt = getOtpExpiryDate();

//     await db.query(
//       `
//       INSERT INTO password_otps (email, otp_hash, expires_at, verified, attempts)
//       VALUES ($1, $2, $3, false, 0)
//       `,
//       [normalizedEmail, otpHash, expiresAt]
//     );

//     await sendOtpEmail({
//       to: normalizedEmail,
//       otp,
//       purpose: "forgot-password",
//     });

//     res.status(200).json({
//       message: "OTP sent successfully. Please check your email.",
//       status: 200,
//     });
//   } catch (error) {
//     console.error("Forgot password error:", error);
//     res.status(500).json({
//       message: "Failed to send OTP",
//       status: 500,
//       error: error.message,
//     });
//   }
// });

// /**
//  * @swagger
//  * /api/auth/verify-otp:
//  *   post:
//  *     summary: Verify OTP for password reset
//  *     tags:
//  *       - Auth
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - email
//  *               - otp
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 example: test@example.com
//  *               otp:
//  *                 type: string
//  *                 example: "671366"
//  *     responses:
//  *       200:
//  *         description: OTP verified successfully
//  *         content:
//  *           application/json:
//  *             example:
//  *               message: OTP verified successfully
//  *               status: 200
//  *       400:
//  *         description: Invalid request or OTP
//  *       404:
//  *         description: OTP not found
//  *       429:
//  *         description: Too many attempts
//  *       500:
//  *         description: Failed to verify OTP
//  */
// app.post("/api/auth/verify-otp", async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     if (!email || !otp) {
//       return res.status(400).json({
//         message: "Email and OTP are required",
//         status: 400,
//       });
//     }

//     const normalizedEmail = email.trim().toLowerCase();

//     const otpResult = await db.query(
//       `
//       SELECT *
//       FROM password_otps
//       WHERE LOWER(email) = $1
//       ORDER BY created_at DESC
//       LIMIT 1
//       `,
//       [normalizedEmail]
//     );

//     if (otpResult.rows.length === 0) {
//       return res.status(404).json({
//         message: "OTP not found. Please request a new OTP.",
//         status: 404,
//       });
//     }

//     const otpRecord = otpResult.rows[0];

//     if (otpRecord.verified) {
//       return res.status(400).json({
//         message: "OTP already verified",
//         status: 400,
//       });
//     }

//     if (new Date() > new Date(otpRecord.expires_at)) {
//       return res.status(400).json({
//         message: "OTP expired. Please request a new OTP.",
//         status: 400,
//       });
//     }

//     if (otpRecord.attempts >= 5) {
//       return res.status(429).json({
//         message: "Too many incorrect attempts. Please request a new OTP.",
//         status: 429,
//       });
//     }

//     const isOtpValid = await bcrypt.compare(otp.toString(), otpRecord.otp_hash);

//     if (!isOtpValid) {
//       await db.query(
//         "UPDATE password_otps SET attempts = attempts + 1 WHERE id = $1",
//         [otpRecord.id]
//       );

//       return res.status(400).json({
//         message: "Invalid OTP",
//         status: 400,
//       });
//     }

//     await db.query("UPDATE password_otps SET verified = true WHERE id = $1", [
//       otpRecord.id,
//     ]);

//     res.status(200).json({
//       message: "OTP verified successfully",
//       status: 200,
//     });
//   } catch (error) {
//     console.error("Verify OTP error:", error);
//     res.status(500).json({
//       message: "Failed to verify OTP",
//       status: 500,
//       error: error.message,
//     });
//   }
// });

// /**
//  * @swagger
//  * /api/auth/verify-registration-otp:
//  *   post:
//  *     summary: Verify registration OTP and create user account
//  *     tags:
//  *       - Auth
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - email
//  *               - otp
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 example: test@example.com
//  *               otp:
//  *                 type: string
//  *                 example: "123456"
//  *     responses:
//  *       201:
//  *         description: Registration verified successfully
//  *         content:
//  *           application/json:
//  *             example:
//  *               message: Registration verified successfully
//  *               status: 201
//  *               user:
//  *                 empid: 1001
//  *                 name: Test User
//  *                 email: test@example.com
//  *                 phone: "1234567890"
//  *       400:
//  *         description: Missing fields, invalid OTP, or expired OTP
//  *       404:
//  *         description: Pending registration not found
//  *       409:
//  *         description: User already exists
//  *       429:
//  *         description: Too many incorrect attempts
//  *       500:
//  *         description: Failed to verify registration OTP
//  */
// app.post("/api/auth/verify-registration-otp", async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     if (!email || !otp) {
//       return res.status(400).json({
//         message: "Email and OTP are required",
//         status: 400,
//       });
//     }

//     const normalizedEmail = email.trim().toLowerCase();

//     const pendingResult = await db.query(
//       `
//       SELECT *
//       FROM pending_registrations
//       WHERE LOWER(email) = $1
//       ORDER BY created_at DESC
//       LIMIT 1
//       `,
//       [normalizedEmail]
//     );

//     if (pendingResult.rows.length === 0) {
//       return res.status(404).json({
//         message: "Pending registration not found. Please sign up again.",
//         status: 404,
//       });
//     }

//     const pendingUser = pendingResult.rows[0];

//     if (new Date() > new Date(pendingUser.expires_at)) {
//       return res.status(400).json({
//         message: "OTP expired. Please sign up again.",
//         status: 400,
//       });
//     }

//     if (pendingUser.attempts >= 5) {
//       return res.status(429).json({
//         message: "Too many incorrect attempts. Please sign up again.",
//         status: 429,
//       });
//     }

//     const isOtpValid = await bcrypt.compare(
//       otp.toString(),
//       pendingUser.otp_hash
//     );

//     if (!isOtpValid) {
//       await db.query(
//         "UPDATE pending_registrations SET attempts = attempts + 1 WHERE id = $1",
//         [pendingUser.id]
//       );

//       return res.status(400).json({
//         message: "Invalid OTP",
//         status: 400,
//       });
//     }

//     const existingUser = await db.query(
//       "SELECT empid, email FROM users WHERE LOWER(email) = $1 OR empid = $2",
//       [normalizedEmail, pendingUser.empid]
//     );

//     if (existingUser.rows.length > 0) {
//       await db.query("DELETE FROM pending_registrations WHERE id = $1", [
//         pendingUser.id,
//       ]);

//       return res.status(409).json({
//         message: "User already exists with this email or employee ID",
//         status: 409,
//       });
//     }

//     const userResult = await db.query(
//       `
//       INSERT INTO users (empid, name, email, password, phone)
//       VALUES ($1, $2, $3, $4, $5)
//       RETURNING empid, name, email, phone
//       `,
//       [
//         pendingUser.empid,
//         pendingUser.name,
//         pendingUser.email,
//         pendingUser.password,
//         pendingUser.phone,
//       ]
//     );

//     await db.query("DELETE FROM pending_registrations WHERE id = $1", [
//       pendingUser.id,
//     ]);

//     res.status(201).json({
//       message: "Registration verified successfully",
//       status: 201,
//       user: userResult.rows[0],
//     });
//   } catch (error) {
//     console.error("Verify registration OTP error:", error);
//     res.status(500).json({
//       message: "Failed to verify registration OTP",
//       status: 500,
//       error: error.message,
//     });
//   }
// });

// /**
//  * @swagger
//  * /api/auth/resend-registration-otp:
//  *   post:
//  *     summary: Resend registration OTP by email
//  *     tags:
//  *       - Auth
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - email
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 example: test@example.com
//  *     responses:
//  *       200:
//  *         description: Registration OTP resent successfully to email
//  *         content:
//  *           application/json:
//  *             example:
//  *               message: Registration OTP resent successfully. Please check your email.
//  *               status: 200
//  *       400:
//  *         description: Email is required
//  *       404:
//  *         description: Pending registration not found
//  *       409:
//  *         description: User already exists
//  *       429:
//  *         description: Please wait before requesting another OTP
//  *       500:
//  *         description: Failed to resend registration OTP
//  */
// app.post("/api/auth/resend-registration-otp", async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({
//         message: "Email is required",
//         status: 400,
//       });
//     }

//     const normalizedEmail = email.trim().toLowerCase();

//     const pendingResult = await db.query(
//       `
//       SELECT *
//       FROM pending_registrations
//       WHERE LOWER(email) = $1
//       ORDER BY created_at DESC
//       LIMIT 1
//       `,
//       [normalizedEmail]
//     );

//     if (pendingResult.rows.length === 0) {
//       return res.status(404).json({
//         message: "Pending registration not found. Please sign up again.",
//         status: 404,
//       });
//     }

//     const pendingUser = pendingResult.rows[0];

//     const existingUser = await db.query(
//       "SELECT empid, email FROM users WHERE LOWER(email) = $1 OR empid = $2",
//       [normalizedEmail, pendingUser.empid]
//     );

//     if (existingUser.rows.length > 0) {
//       await db.query("DELETE FROM pending_registrations WHERE id = $1", [
//         pendingUser.id,
//       ]);

//       return res.status(409).json({
//         message: "User already exists with this email or employee ID",
//         status: 409,
//       });
//     }

//     const createdAt = new Date(pendingUser.created_at);
//     const now = new Date();
//     const secondsSinceLastOtp = Math.floor((now - createdAt) / 1000);

//     if (secondsSinceLastOtp < 60) {
//       return res.status(429).json({
//         message: `Please wait ${
//           60 - secondsSinceLastOtp
//         } seconds before requesting another OTP.`,
//         status: 429,
//       });
//     }

//     const otp = generateOtp();
//     const otpHash = await bcrypt.hash(otp, 10);
//     const expiresAt = getOtpExpiryDate();

//     await db.query(
//       `
//       UPDATE pending_registrations
//       SET 
//         otp_hash = $1,
//         expires_at = $2,
//         verified = false,
//         attempts = 0,
//         created_at = CURRENT_TIMESTAMP
//       WHERE id = $3
//       `,
//       [otpHash, expiresAt, pendingUser.id]
//     );

//     await sendOtpEmail({
//       to: normalizedEmail,
//       otp,
//       purpose: "registration",
//     });

//     res.status(200).json({
//       message: "Registration OTP resent successfully. Please check your email.",
//       status: 200,
//     });
//   } catch (error) {
//     console.error("Resend registration OTP error:", error);
//     res.status(500).json({
//       message: "Failed to resend registration OTP",
//       status: 500,
//       error: error.message,
//     });
//   }
// });

// /**
//  * @swagger
//  * /api/auth/confirm-password:
//  *   post:
//  *     summary: Reset password after OTP verification
//  *     tags:
//  *       - Auth
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - email
//  *               - newPassword
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 example: test@example.com
//  *               newPassword:
//  *                 type: string
//  *                 example: newPassword123
//  *     responses:
//  *       200:
//  *         description: Password reset successfully
//  *         content:
//  *           application/json:
//  *             example:
//  *               message: Password reset successfully
//  *               status: 200
//  *       400:
//  *         description: Invalid request, expired OTP, or OTP not verified
//  *       404:
//  *         description: OTP verification not found
//  *       500:
//  *         description: Failed to reset password
//  */
// app.post("/api/auth/confirm-password", async (req, res) => {
//   try {
//     const { email, newPassword } = req.body;

//     if (!email || !newPassword) {
//       return res.status(400).json({
//         message: "Email and new password are required",
//         status: 400,
//       });
//     }

//     if (newPassword.length < 6) {
//       return res.status(400).json({
//         message: "Password must be at least 6 characters long",
//         status: 400,
//       });
//     }

//     const normalizedEmail = email.trim().toLowerCase();

//     const otpResult = await db.query(
//       `
//       SELECT *
//       FROM password_otps
//       WHERE LOWER(email) = $1
//       ORDER BY created_at DESC
//       LIMIT 1
//       `,
//       [normalizedEmail]
//     );

//     if (otpResult.rows.length === 0) {
//       return res.status(404).json({
//         message: "OTP verification not found. Please request a new OTP.",
//         status: 404,
//       });
//     }

//     const otpRecord = otpResult.rows[0];

//     if (!otpRecord.verified) {
//       return res.status(400).json({
//         message: "Please verify OTP before resetting password",
//         status: 400,
//       });
//     }

//     if (new Date() > new Date(otpRecord.expires_at)) {
//       return res.status(400).json({
//         message: "OTP expired. Please request a new OTP.",
//         status: 400,
//       });
//     }

//     const password = generatePassword(newPassword);

//     await db.query(
//       `
//       UPDATE users
//       SET password = $1
//       WHERE LOWER(email) = $2
//       `,
//       [JSON.stringify(password), normalizedEmail]
//     );

//     await db.query(
//       `
//       DELETE FROM password_otps
//       WHERE LOWER(email) = $1
//       `,
//       [normalizedEmail]
//     );

//     res.status(200).json({
//       message: "Password reset successfully",
//       status: 200,
//     });
//   } catch (error) {
//     console.error("Confirm password error:", error);
//     res.status(500).json({
//       message: "Failed to reset password",
//       status: 500,
//       error: error.message,
//     });
//   }
// });

// /**
//  * ============================================
//  * EVENT HANDLERS
//  * ============================================
//  */
// async function getEventsHandler(req, res) {
//   try {
//     const result = await db.query(
//       "SELECT * FROM events ORDER BY start_datetime DESC"
//     );
//     res.json(result.rows);
//   } catch (error) {
//     console.error("Fetch events error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// }

// async function createEventHandler(req, res) {
//   try {
//     const {
//       title,
//       user_id,
//       category_type,
//       start_datetime,
//       end_datetime,
//       participants,
//       location,
//       food_service,
//       agenda,
//       has_mifi_device,
//       has_kramer_device,
//       mifi_device,
//       kramer_device,
//       published,
//     } = req.body;

//     const logistics = await db.query(
//       `
//       INSERT INTO logistics (food_service, agenda, mifi_device, kramer_device, published)
//       VALUES ($1, $2, $3, $4, $5)
//       RETURNING *
//       `,
//       [
//         JSON.stringify(food_service || {}),
//         JSON.stringify(agenda || {}),
//         Boolean(has_mifi_device ?? mifi_device),
//         Boolean(has_kramer_device ?? kramer_device),
//         Boolean(published),
//       ]
//     );

//     const logisticsId = logistics.rows[0].id;

//     const result = await db.query(
//       `
//       INSERT INTO events (title, user_id, category_type, start_datetime, end_datetime, participants, location, published, logistics_id)
//       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
//       RETURNING *
//       `,
//       [
//         title,
//         user_id || 1,
//         category_type,
//         start_datetime,
//         end_datetime,
//         JSON.stringify(participants || []),
//         location,
//         Boolean(published),
//         logisticsId,
//       ]
//     );

//     res.status(201).json({
//       message: "Event created successfully",
//       status: 201,
//       data: result.rows[0],
//       event: result.rows[0],
//       id: result.rows[0].id,
//     });
//   } catch (error) {
//     console.error("Create event error:", error);
//     res
//       .status(500)
//       .json({ message: "Internal Server Error", error: error.message });
//   }
// }

// /**
//  * ============================================
//  * EVENT ROUTES
//  * ============================================
//  */

// /**
//  * @swagger
//  * /api/event/all:
//  *   get:
//  *     summary: Get all events
//  *     tags:
//  *       - Events
//  *     responses:
//  *       200:
//  *         description: List of all events
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Event'
//  *       500:
//  *         description: Server error
//  */

// /**
//  * @swagger
//  * /api/event/my:
//  *   get:
//  *     summary: Get events for the current user
//  *     tags:
//  *       - Events
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: List of user events
//  *       500:
//  *         description: Server error
//  */

// /**
//  * @swagger
//  * /events:
//  *   get:
//  *     summary: Get all events - legacy route
//  *     tags:
//  *       - Events
//  *     responses:
//  *       200:
//  *         description: List of events
//  */

// /**
//  * @swagger
//  * /:
//  *   get:
//  *     summary: Root route - returns all events
//  *     tags:
//  *       - Events
//  *     responses:
//  *       200:
//  *         description: List of events
//  */
// app.get("/", getEventsHandler);
// app.get("/events", getEventsHandler);
// app.get("/api/event/all", getEventsHandler);
// app.get("/api/event/my", getEventsHandler);
// app.get("/api/events", getEventsHandler);

// /**
//  * @swagger
//  * /api/event/new:
//  *   post:
//  *     summary: Create a new event with logistics
//  *     tags:
//  *       - Events
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               title:
//  *                 type: string
//  *                 example: AI Workshop
//  *               user_id:
//  *                 type: integer
//  *                 example: 1
//  *               category_type:
//  *                 type: string
//  *                 example: Workshop
//  *               start_datetime:
//  *                 type: string
//  *                 format: date-time
//  *                 example: "2026-05-27T09:00:00.000Z"
//  *               end_datetime:
//  *                 type: string
//  *                 format: date-time
//  *                 example: "2026-05-27T12:00:00.000Z"
//  *               participants:
//  *                 type: array
//  *                 items:
//  *                   type: string
//  *               location:
//  *                 type: string
//  *                 example: TCS Paceport
//  *               food_service:
//  *                 type: object
//  *               agenda:
//  *                 type: object
//  *               has_mifi_device:
//  *                 type: boolean
//  *                 example: true
//  *               has_kramer_device:
//  *                 type: boolean
//  *                 example: false
//  *               published:
//  *                 type: boolean
//  *                 example: true
//  *     responses:
//  *       201:
//  *         description: Event created successfully
//  *       500:
//  *         description: Server error
//  */
// app.post("/events", createEventHandler);
// app.post("/api/event/new", createEventHandler);
// app.post("/api/events", createEventHandler);

// /**
//  * @swagger
//  * /api/event/{id}:
//  *   get:
//  *     summary: Get a single event by ID with logistics details
//  *     tags:
//  *       - Events
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         example: 1
//  *     responses:
//  *       200:
//  *         description: Event with logistics
//  *       404:
//  *         description: Event not found
//  *       500:
//  *         description: Server error
//  */
// app.get("/api/event/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const result = await db.query(
//       `
//       SELECT 
//         e.*,
//         l.food_service,
//         l.agenda,
//         l.mifi_device,
//         l.kramer_device,
//         l.published AS logistics_published
//       FROM events e
//       LEFT JOIN logistics l ON e.logistics_id = l.id
//       WHERE e.id = $1
//       `,
//       [id]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: "Event not found" });
//     }

//     res.json(result.rows[0]);
//   } catch (error) {
//     console.error("Fetch event by id error:", error);
//     res
//       .status(500)
//       .json({ message: "Internal Server Error", error: error.message });
//   }
// });

// /**
//  * @swagger
//  * /events/{id}:
//  *   put:
//  *     summary: Update event by ID - stub route
//  *     tags:
//  *       - Events
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         example: 1
//  *     responses:
//  *       200:
//  *         description: Update stub response
//  */
// app.put("/events/:id", async (req, res) => {
//   res.json({ message: "Update event endpoint working", id: req.params.id });
// });

// /**
//  * @swagger
//  * /delete/{id}:
//  *   delete:
//  *     summary: Delete event by ID - stub route
//  *     tags:
//  *       - Events
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         example: 1
//  *     responses:
//  *       200:
//  *         description: Delete stub response
//  */
// app.delete("/delete/:id", async (req, res) => {
//   res.json({ message: "Delete endpoint working", id: req.params.id });
// });

// /**
//  * ============================================
//  * LOGISTICS ROUTES
//  * ============================================
//  */

// /**
//  * @swagger
//  * /api/event/getLogistics/{id}:
//  *   get:
//  *     summary: Get logistics by logistics ID
//  *     tags:
//  *       - Logistics
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         example: 1
//  *     responses:
//  *       200:
//  *         description: Logistics record
//  *       404:
//  *         description: Logistics not found
//  *       500:
//  *         description: Server error
//  */
// app.get("/api/event/getLogistics/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await db.query("SELECT * FROM logistics WHERE id = $1", [id]);

//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: "Logistics not found" });
//     }

//     res.json(result.rows[0]);
//   } catch (error) {
//     console.error("Fetch logistics by id error:", error);
//     res
//       .status(500)
//       .json({ message: "Internal Server Error", error: error.message });
//   }
// });

// /**
//  * @swagger
//  * /logistics:
//  *   get:
//  *     summary: Get all logistics records
//  *     tags:
//  *       - Logistics
//  *     responses:
//  *       200:
//  *         description: List of all logistics
//  *       500:
//  *         description: Server error
//  */
// app.get("/logistics", async (req, res) => {
//   try {
//     const result = await db.query("SELECT * FROM logistics ORDER BY id DESC");
//     res.json(result.rows);
//   } catch (error) {
//     console.error("Fetch logistics error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// /**
//  * ============================================
//  * USER ROUTES
//  * ============================================
//  */

// /**
//  * @swagger
//  * /api/user/current/{id}:
//  *   get:
//  *     summary: Get user details by employee ID
//  *     tags:
//  *       - Users
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         example: 1
//  *     responses:
//  *       200:
//  *         description: User details
//  *       404:
//  *         description: User not found
//  *       500:
//  *         description: Server error
//  */
// app.get("/api/user/current/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const result = await db.query(
//       "SELECT empid, name, email, phone FROM users WHERE empid = $1",
//       [id]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json(result.rows[0]);
//   } catch (error) {
//     console.error("Fetch current user error:", error);
//     res
//       .status(500)
//       .json({ message: "Internal Server Error", error: error.message });
//   }
// });

// /**
//  * ============================================
//  * DATE FILTER ROUTE
//  * ============================================
//  */

// /**
//  * @swagger
//  * /date:
//  *   get:
//  *     summary: Get events between two datetime values
//  *     tags:
//  *       - Events
//  *     parameters:
//  *       - in: query
//  *         name: start_datetime
//  *         required: true
//  *         schema:
//  *           type: string
//  *           format: date-time
//  *         example: "2026-05-01T00:00:00.000Z"
//  *       - in: query
//  *         name: end_datetime
//  *         required: true
//  *         schema:
//  *           type: string
//  *           format: date-time
//  *         example: "2026-05-31T23:59:59.000Z"
//  *     responses:
//  *       200:
//  *         description: Events within the date range
//  *       500:
//  *         description: Server error
//  */
// app.get("/date", async (req, res) => {
//   try {
//     const startDate = new Date(req.query.start_datetime);
//     const endDate = new Date(req.query.end_datetime);

//     const result = await db.query(
//       `
//       SELECT *
//       FROM events
//       WHERE start_datetime BETWEEN $1 AND $2
//       ORDER BY start_datetime DESC
//       `,
//       [startDate.toISOString(), endDate.toISOString()]
//     );

//     res.json(result.rows);
//   } catch (error) {
//     console.error("Date filter error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// /**
//  * ============================================
//  * START SERVER
//  * ============================================
//  */
// const PORT = process.env.PORT || 4000;

// app.listen(PORT, () => {
//   console.log(`V2 backend running on port ${PORT}`);
//   console.log(`Swagger Docs: http://localhost:${PORT}/api-docs`);
// });


require("dotenv").config();

const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");

const db = require("./src/db");

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cors({ origin: true, credentials: true }));

/**
 * ============================================
 * AWS SES CONFIG
 * ============================================
 * Uses EC2 IAM Role automatically when deployed on EC2.
 * Do not add AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY in .env for production.
 */
const sesClient = new SESClient({
  region: process.env.AWS_REGION || "us-east-1",
});

async function sendOtpEmail({ to, otp, purpose }) {
  if (!process.env.SES_FROM_EMAIL) {
    throw new Error("SES_FROM_EMAIL is missing in environment variables");
  }

  const isRegistration = purpose === "registration";
  const subject = isRegistration
    ? "Verify your registration OTP"
    : "Your password reset OTP";
  const textBody = `Your OTP is ${otp}. It expires in 10 minutes. Do not share it with anyone.`;
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>${subject}</h2>
      <p>Your OTP code is:</p>
      <h1 style="letter-spacing: 4px;">${otp}</h1>
      <p>This OTP will expire in <strong>10 minutes</strong>.</p>
      <p>Do not share this OTP with anyone.</p>
    </div>
  `;

  const command = new SendEmailCommand({
    Source: process.env.SES_FROM_EMAIL,
    Destination: { ToAddresses: [to] },
    Message: {
      Subject: { Data: subject, Charset: "UTF-8" },
      Body: {
        Text: { Data: textBody, Charset: "UTF-8" },
        Html: { Data: htmlBody, Charset: "UTF-8" },
      },
    },
  });

  await sesClient.send(command);
}

/**
 * ============================================
 * REUSABLE RESEND OTP HELPER (from v2 refactor)
 * ============================================
 */
async function resendOtp({ email, tableName, purpose, userCheckRequired = false }) {
  const normalizedEmail = email.toLowerCase().trim();

  if (userCheckRequired) {
    const userResult = await db.query(
      "SELECT * FROM users WHERE LOWER(email) = $1",
      [normalizedEmail]
    );
    if (userResult.rows.length === 0) {
      return { error: true, status: 404, message: "User not found" };
    }
  }

  const otpResult = await db.query(
    `SELECT * FROM ${tableName} WHERE LOWER(email) = $1 ORDER BY created_at DESC LIMIT 1`,
    [normalizedEmail]
  );

  if (otpResult.rows.length > 0) {
    const lastOtp = otpResult.rows[0];
    const secondsSinceLastOtp = Math.floor(
      (new Date() - new Date(lastOtp.created_at)) / 1000
    );
    if (secondsSinceLastOtp < 60) {
      return {
        error: true,
        status: 429,
        message: `Please wait ${60 - secondsSinceLastOtp} seconds before requesting another OTP.`,
      };
    }
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpHash = await bcrypt.hash(otp, 10);
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  if (tableName === "pending_registrations") {
    const pendingResult = await db.query(
      "SELECT * FROM pending_registrations WHERE LOWER(email) = $1",
      [normalizedEmail]
    );
    if (pendingResult.rows.length === 0) {
      return { error: true, status: 404, message: "Pending registration not found" };
    }
    await db.query(
      `UPDATE pending_registrations
       SET otp_hash=$1, expires_at=$2, verified=false, attempts=0, created_at=CURRENT_TIMESTAMP
       WHERE LOWER(email)=$3`,
      [otpHash, expiresAt, normalizedEmail]
    );
  }

  if (tableName === "password_otps") {
    await db.query(
      `INSERT INTO password_otps (email, otp_hash, expires_at, verified, attempts)
       VALUES ($1, $2, $3, false, 0)`,
      [normalizedEmail, otpHash, expiresAt]
    );
  }

  await sendOtpEmail({ to: normalizedEmail, otp, purpose });

  return {
    error: false,
    status: 200,
    message:
      purpose === "registration"
        ? "Registration OTP resent successfully. Please check your email."
        : "Password reset OTP resent successfully. Please check your email.",
  };
}

/**
 * ============================================
 * PASSWORD HELPERS
 * ============================================
 */
function generatePassword(password) {
  const salt = crypto.randomBytes(32).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return { salt, hash };
}

function validatePassword(password, salt, hash) {
  return (
    hash === crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex")
  );
}

function createToken(user) {
  return jwt.sign(
    { empid: user.empid, email: user.email, name: user.name },
    process.env.JWT_SECRET || "local-dev-secret",
    { expiresIn: "1d" }
  );
}

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function getOtpExpiryDate() {
  return new Date(Date.now() + 10 * 60 * 1000);
}

/**
 * ============================================
 * SWAGGER CONFIG
 * ============================================
 */
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Playlist Event Management API",
      version: "1.0.0",
      description: "API documentation for Playlist Reservation Management System",
    },
    servers: [{ url: "http://localhost:4000" }],
    components: {
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            empid: { type: "integer", example: 1 },
            name: { type: "string", example: "Test User" },
            email: { type: "string", example: "test@example.com" },
            phone: { type: "string", example: "1234567890" },
          },
        },
        Event: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            title: { type: "string", example: "AI Workshop" },
            user_id: { type: "integer", example: 1 },
            category_type: { type: "string", example: "Workshop" },
            start_datetime: { type: "string", format: "date-time", example: "2026-05-27T09:00:00.000Z" },
            end_datetime: { type: "string", format: "date-time", example: "2026-05-27T12:00:00.000Z" },
            participants: { type: "array", items: { type: "string" } },
            location: { type: "string", example: "TCS Paceport" },
            logistics_id: { type: "integer", example: 1 },
            published: { type: "boolean", example: true },
          },
        },
        Logistics: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            food_service: { type: "object" },
            agenda: { type: "object" },
            mifi_device: { type: "boolean", example: true },
            kramer_device: { type: "boolean", example: false },
            published: { type: "boolean", example: true },
          },
        },
      },
    },
  },
  apis: ["./index.js"],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

/**
 * ============================================
 * HEALTH
 * ============================================
 */

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Backend is running
 */
app.get("/health", (req, res) => {
  res.json({ message: "V2 backend is running", status: 200 });
});

/**
 * ============================================
 * AUTH HANDLERS
 * ============================================
 */
async function signupHandler(req, res) {
  try {
    const { empid, name, email, password, phone } = req.body;

    if (!empid || !name || !email || !password) {
      return res.status(400).json({
        message: "Employee ID, name, email and password are required",
        status: 400,
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await db.query(
      "SELECT empid, email FROM users WHERE LOWER(email) = $1 OR empid = $2",
      [normalizedEmail, empid]
    );
    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        message: "User already exists with this email or employee ID",
        status: 409,
      });
    }

    const passwordHash = generatePassword(password);
    const otp = generateOtp();
    const otpHash = await bcrypt.hash(otp, 10);
    const expiresAt = getOtpExpiryDate();

    await db.query(
      `INSERT INTO pending_registrations
         (empid, name, email, password, phone, otp_hash, expires_at, verified, attempts)
       VALUES ($1,$2,$3,$4,$5,$6,$7,false,0)
       ON CONFLICT (email) DO UPDATE SET
         empid=EXCLUDED.empid, name=EXCLUDED.name, password=EXCLUDED.password,
         phone=EXCLUDED.phone, otp_hash=EXCLUDED.otp_hash, expires_at=EXCLUDED.expires_at,
         verified=false, attempts=0, created_at=CURRENT_TIMESTAMP
       RETURNING *`,
      [empid, name, normalizedEmail, JSON.stringify(passwordHash), phone || null, otpHash, expiresAt]
    );

    await sendOtpEmail({ to: normalizedEmail, otp, purpose: "registration" });

    res.status(201).json({
      message: "OTP sent successfully. Please check your email.",
      status: 201,
      email: normalizedEmail,
      empid,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Signup failed", status: 500, error: error.message });
  }
}

async function loginHandler(req, res) {
  try {
    const { email, password } = req.body;

    const result = await db.query(
      "SELECT * FROM users WHERE LOWER(email) = $1",
      [email.trim().toLowerCase()]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "User is not valid", status: 401 });
    }

    const user = result.rows[0];
    const isValidUser = validatePassword(password, user.password.salt, user.password.hash);

    if (!isValidUser) {
      return res.status(401).json({ message: "User is not valid", status: 401 });
    }

    const token = createToken(user);

    res.status(200).json({
      message: "Successfully Logged in",
      status: 200,
      token,
      user: { empid: user.empid, name: user.name, email: user.email, phone: user.phone },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
}

/**
 * ============================================
 * AUTH ROUTES
 * ============================================
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user and send registration OTP by email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [empid, name, email, password]
 *             properties:
 *               empid: { type: integer, example: 1001 }
 *               name: { type: string, example: Test User }
 *               email: { type: string, example: test@example.com }
 *               password: { type: string, example: password123 }
 *               phone: { type: string, example: "9876543210" }
 *     responses:
 *       201:
 *         description: OTP sent successfully to email
 *       400:
 *         description: Missing required fields
 *       409:
 *         description: User already exists
 *       500:
 *         description: Server error
 */
app.post("/signup", signupHandler);
app.post("/api/auth/signup", signupHandler);
app.post("/api/auth/register", signupHandler);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user and get JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, example: test@example.com }
 *               password: { type: string, example: password123 }
 *     responses:
 *       200:
 *         description: Login successful — returns JWT token
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
app.post("/login", loginHandler);
app.post("/api/auth/login", loginHandler);

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Send OTP by email for password reset
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email: { type: string, example: test@example.com }
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       400:
 *         description: Email is required
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to send OTP
 */
app.post("/api/auth/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required", status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const userResult = await db.query(
      "SELECT empid, email FROM users WHERE LOWER(email) = $1",
      [normalizedEmail]
    );
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "User not found with this email", status: 404 });
    }

    const otp = generateOtp();
    const otpHash = await bcrypt.hash(otp, 10);
    const expiresAt = getOtpExpiryDate();

    await db.query(
      `INSERT INTO password_otps (email, otp_hash, expires_at, verified, attempts)
       VALUES ($1, $2, $3, false, 0)`,
      [normalizedEmail, otpHash, expiresAt]
    );

    await sendOtpEmail({ to: normalizedEmail, otp, purpose: "forgot-password" });

    res.status(200).json({
      message: "OTP sent successfully. Please check your email.",
      status: 200,
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Failed to send OTP", status: 500, error: error.message });
  }
});

/**
 * @swagger
 * /api/auth/verify-otp:
 *   post:
 *     summary: Verify OTP for password reset
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, otp]
 *             properties:
 *               email: { type: string, example: test@example.com }
 *               otp: { type: string, example: "671366" }
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       400:
 *         description: Invalid or expired OTP
 *       404:
 *         description: OTP not found
 *       429:
 *         description: Too many attempts
 *       500:
 *         description: Failed to verify OTP
 */
app.post("/api/auth/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required", status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const otpResult = await db.query(
      `SELECT * FROM password_otps WHERE LOWER(email) = $1 ORDER BY created_at DESC LIMIT 1`,
      [normalizedEmail]
    );

    if (otpResult.rows.length === 0) {
      return res.status(404).json({ message: "OTP not found. Please request a new OTP.", status: 404 });
    }

    const otpRecord = otpResult.rows[0];

    if (otpRecord.verified) {
      return res.status(400).json({ message: "OTP already verified", status: 400 });
    }
    if (new Date() > new Date(otpRecord.expires_at)) {
      return res.status(400).json({ message: "OTP expired. Please request a new OTP.", status: 400 });
    }
    if (otpRecord.attempts >= 5) {
      return res.status(429).json({ message: "Too many incorrect attempts. Please request a new OTP.", status: 429 });
    }

    const isOtpValid = await bcrypt.compare(otp.toString(), otpRecord.otp_hash);
    if (!isOtpValid) {
      await db.query("UPDATE password_otps SET attempts = attempts + 1 WHERE id = $1", [otpRecord.id]);
      return res.status(400).json({ message: "Invalid OTP", status: 400 });
    }

    await db.query("UPDATE password_otps SET verified = true WHERE id = $1", [otpRecord.id]);
    res.status(200).json({ message: "OTP verified successfully", status: 200 });
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ message: "Failed to verify OTP", status: 500, error: error.message });
  }
});

/**
 * @swagger
 * /api/auth/verify-registration-otp:
 *   post:
 *     summary: Verify registration OTP and create user account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, otp]
 *             properties:
 *               email: { type: string, example: test@example.com }
 *               otp: { type: string, example: "123456" }
 *     responses:
 *       201:
 *         description: Registration verified successfully
 *       400:
 *         description: Missing fields, invalid or expired OTP
 *       404:
 *         description: Pending registration not found
 *       409:
 *         description: User already exists
 *       429:
 *         description: Too many incorrect attempts
 *       500:
 *         description: Failed to verify registration OTP
 */
app.post("/api/auth/verify-registration-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required", status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const pendingResult = await db.query(
      `SELECT * FROM pending_registrations WHERE LOWER(email) = $1 ORDER BY created_at DESC LIMIT 1`,
      [normalizedEmail]
    );

    if (pendingResult.rows.length === 0) {
      return res.status(404).json({ message: "Pending registration not found. Please sign up again.", status: 404 });
    }

    const pendingUser = pendingResult.rows[0];

    if (new Date() > new Date(pendingUser.expires_at)) {
      return res.status(400).json({ message: "OTP expired. Please sign up again.", status: 400 });
    }
    if (pendingUser.attempts >= 5) {
      return res.status(429).json({ message: "Too many incorrect attempts. Please sign up again.", status: 429 });
    }

    const isOtpValid = await bcrypt.compare(otp.toString(), pendingUser.otp_hash);
    if (!isOtpValid) {
      await db.query(
        "UPDATE pending_registrations SET attempts = attempts + 1 WHERE id = $1",
        [pendingUser.id]
      );
      return res.status(400).json({ message: "Invalid OTP", status: 400 });
    }

    const existingUser = await db.query(
      "SELECT empid, email FROM users WHERE LOWER(email) = $1 OR empid = $2",
      [normalizedEmail, pendingUser.empid]
    );
    if (existingUser.rows.length > 0) {
      await db.query("DELETE FROM pending_registrations WHERE id = $1", [pendingUser.id]);
      return res.status(409).json({ message: "User already exists with this email or employee ID", status: 409 });
    }

    const userResult = await db.query(
      `INSERT INTO users (empid, name, email, password, phone)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING empid, name, email, phone`,
      [pendingUser.empid, pendingUser.name, pendingUser.email, pendingUser.password, pendingUser.phone]
    );

    await db.query("DELETE FROM pending_registrations WHERE id = $1", [pendingUser.id]);

    res.status(201).json({
      message: "Registration verified successfully",
      status: 201,
      user: userResult.rows[0],
    });
  } catch (error) {
    console.error("Verify registration OTP error:", error);
    res.status(500).json({ message: "Failed to verify registration OTP", status: 500, error: error.message });
  }
});

/**
 * @swagger
 * /api/auth/resend-registration-otp:
 *   post:
 *     summary: Resend registration OTP by email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email: { type: string, example: test@example.com }
 *     responses:
 *       200:
 *         description: Registration OTP resent successfully
 *       400:
 *         description: Email is required
 *       404:
 *         description: Pending registration not found
 *       409:
 *         description: User already exists
 *       429:
 *         description: Please wait before requesting another OTP
 *       500:
 *         description: Failed to resend registration OTP
 */
app.post("/api/auth/resend-registration-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required", status: 400 });
  const result = await resendOtp({ email, tableName: "pending_registrations", purpose: "registration" });
  res.status(result.status).json({ message: result.message, status: result.status });
});

/**
 * @swagger
 * /api/auth/resend-password-otp:
 *   post:
 *     summary: Resend password reset OTP by email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email: { type: string, example: test@example.com }
 *     responses:
 *       200:
 *         description: Password reset OTP resent successfully
 *       400:
 *         description: Email is required
 *       404:
 *         description: User not found
 *       429:
 *         description: Please wait before requesting another OTP
 *       500:
 *         description: Failed to resend OTP
 */
app.post("/api/auth/resend-password-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required", status: 400 });
  const result = await resendOtp({ email, tableName: "password_otps", purpose: "forgot-password", userCheckRequired: true });
  res.status(result.status).json({ message: result.message, status: result.status });
});

/**
 * @swagger
 * /api/auth/confirm-password:
 *   post:
 *     summary: Reset password after OTP verification
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, newPassword]
 *             properties:
 *               email: { type: string, example: test@example.com }
 *               newPassword: { type: string, example: newPassword123 }
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid request, expired OTP, or OTP not verified
 *       404:
 *         description: OTP verification not found
 *       500:
 *         description: Failed to reset password
 */
app.post("/api/auth/confirm-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return res.status(400).json({ message: "Email and new password are required", status: 400 });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long", status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const otpResult = await db.query(
      `SELECT * FROM password_otps WHERE LOWER(email) = $1 ORDER BY created_at DESC LIMIT 1`,
      [normalizedEmail]
    );

    if (otpResult.rows.length === 0) {
      return res.status(404).json({ message: "OTP verification not found. Please request a new OTP.", status: 404 });
    }

    const otpRecord = otpResult.rows[0];
    if (!otpRecord.verified) {
      return res.status(400).json({ message: "Please verify OTP before resetting password", status: 400 });
    }
    if (new Date() > new Date(otpRecord.expires_at)) {
      return res.status(400).json({ message: "OTP expired. Please request a new OTP.", status: 400 });
    }

    const password = generatePassword(newPassword);
    await db.query(
      `UPDATE users SET password = $1 WHERE LOWER(email) = $2`,
      [JSON.stringify(password), normalizedEmail]
    );
    await db.query(`DELETE FROM password_otps WHERE LOWER(email) = $1`, [normalizedEmail]);

    res.status(200).json({ message: "Password reset successfully", status: 200 });
  } catch (error) {
    console.error("Confirm password error:", error);
    res.status(500).json({ message: "Failed to reset password", status: 500, error: error.message });
  }
});

/**
 * ============================================
 * EVENT HANDLERS
 * ============================================
 */
async function getEventsHandler(req, res) {
  try {
    const result = await db.query(
      "SELECT * FROM events ORDER BY start_datetime DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Fetch events error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function createEventHandler(req, res) {
  try {
    const {
      title,
      user_id,
      category_type,
      start_datetime,
      end_datetime,
      participants,
      location,
      food_service,
      agenda,
      has_mifi_device,
      has_kramer_device,
      mifi_device,
      kramer_device,
      published,
    } = req.body;

    const logistics = await db.query(
      `INSERT INTO logistics (food_service, agenda, mifi_device, kramer_device, published)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        JSON.stringify(food_service || {}),
        JSON.stringify(agenda || {}),
        Boolean(has_mifi_device ?? mifi_device),
        Boolean(has_kramer_device ?? kramer_device),
        Boolean(published),
      ]
    );
    const logisticsId = logistics.rows[0].id;

    const result = await db.query(
      `INSERT INTO events (title, user_id, category_type, start_datetime, end_datetime, participants, location, published, logistics_id)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       RETURNING *`,
      [
        title,
        user_id || 1,
        category_type,
        start_datetime,
        end_datetime,
        JSON.stringify(participants || []),
        location,
        Boolean(published),
        logisticsId,
      ]
    );

    res.status(201).json({
      message: "Event created successfully",
      status: 201,
      data: result.rows[0],
      event: result.rows[0],
      id: result.rows[0].id,
    });
  } catch (error) {
    console.error("Create event error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}

/**
 * ============================================
 * EVENT ROUTES
 * ============================================
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Root route - returns all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of events
 *
 * /events:
 *   get:
 *     summary: Get all events - legacy route
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of events
 *
 * /api/event/all:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of all events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *
 * /api/event/my:
 *   get:
 *     summary: Get events for the current user
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user events
 */
app.get("/", getEventsHandler);
app.get("/events", getEventsHandler);
app.get("/api/event/all", getEventsHandler);
app.get("/api/event/my", getEventsHandler);
app.get("/api/events", getEventsHandler);

/**
 * @swagger
 * /api/event/new:
 *   post:
 *     summary: Create a new event with logistics
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string, example: AI Workshop }
 *               user_id: { type: integer, example: 1 }
 *               category_type: { type: string, example: Workshop }
 *               start_datetime: { type: string, format: date-time }
 *               end_datetime: { type: string, format: date-time }
 *               participants: { type: array, items: { type: string } }
 *               location: { type: string, example: TCS Paceport }
 *               food_service: { type: object }
 *               agenda: { type: object }
 *               has_mifi_device: { type: boolean }
 *               has_kramer_device: { type: boolean }
 *               published: { type: boolean }
 *     responses:
 *       201:
 *         description: Event created successfully
 *       500:
 *         description: Server error
 */
app.post("/events", createEventHandler);
app.post("/api/event/new", createEventHandler);
app.post("/api/events", createEventHandler);

/**
 * @swagger
 * /api/event/{id}:
 *   get:
 *     summary: Get a single event by ID with logistics details
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Event with logistics
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */
app.get("/api/event/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      `SELECT e.*, l.food_service, l.agenda, l.mifi_device, l.kramer_device, l.published AS logistics_published
       FROM events e
       LEFT JOIN logistics l ON e.logistics_id = l.id
       WHERE e.id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Fetch event by id error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Update event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Update response
 */
app.put("/events/:id", async (req, res) => {
  res.json({ message: "Update event endpoint working", id: req.params.id });
});

/**
 * @swagger
 * /delete/{id}:
 *   delete:
 *     summary: Delete event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Delete response
 */
app.delete("/delete/:id", async (req, res) => {
  res.json({ message: "Delete endpoint working", id: req.params.id });
});

/**
 * ============================================
 * LOGISTICS ROUTES
 * ============================================
 */

/**
 * @swagger
 * /api/event/getLogistics/{id}:
 *   get:
 *     summary: Get logistics by logistics ID
 *     tags: [Logistics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Logistics record
 *       404:
 *         description: Logistics not found
 *       500:
 *         description: Server error
 */
app.get("/api/event/getLogistics/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query("SELECT * FROM logistics WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Logistics not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Fetch logistics by id error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

/**
 * @swagger
 * /logistics:
 *   get:
 *     summary: Get all logistics records
 *     tags: [Logistics]
 *     responses:
 *       200:
 *         description: List of all logistics
 *       500:
 *         description: Server error
 */
app.get("/logistics", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM logistics ORDER BY id DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("Fetch logistics error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/**
 * ============================================
 * USER ROUTES
 * ============================================
 */

/**
 * @swagger
 * /api/user/current/{id}:
 *   get:
 *     summary: Get user details by employee ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
app.get("/api/user/current/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      "SELECT empid, name, email, phone FROM users WHERE empid = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Fetch current user error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

/**
 * ============================================
 * DATE FILTER ROUTE
 * ============================================
 */

/**
 * @swagger
 * /date:
 *   get:
 *     summary: Get events between two datetime values
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: start_datetime
 *         required: true
 *         schema: { type: string, format: date-time }
 *       - in: query
 *         name: end_datetime
 *         required: true
 *         schema: { type: string, format: date-time }
 *     responses:
 *       200:
 *         description: Events within the date range
 *       500:
 *         description: Server error
 */
app.get("/date", async (req, res) => {
  try {
    const startDate = new Date(req.query.start_datetime);
    const endDate = new Date(req.query.end_datetime);
    const result = await db.query(
      `SELECT * FROM events WHERE start_datetime BETWEEN $1 AND $2 ORDER BY start_datetime DESC`,
      [startDate.toISOString(), endDate.toISOString()]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Date filter error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/**
 * ============================================
 * START SERVER
 * ============================================
 */
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`V2 backend running on port ${PORT}`);
  console.log(`Swagger Docs: http://localhost:${PORT}/api-docs`);
});