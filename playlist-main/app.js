// require('dotenv').config();  
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const crypto = require("crypto");
// const multer = require("multer");
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// const db = require("./db");
// const { upsertSession, upsertDetails, upsertOverview } = require("./queries");
// const { uploadFilesToAzure, insertInDatabase } = require("./handler");

// const app = express();
// app.use(bodyParser.json({limit:  '1023mb'}));
// app.use(cors());
// const { handleImageUpload } = require("./blob");

// app.use(express.json());

// function extractSessionData(session) {
//   const { empID, name, role } = session;
//   return { empID, name, role };
// }

// // Function to extract data from detailed
// function extractDetailedData(detailed) {
//   const { bannerText, bannerDetailedText, bannerImage, bannerVideo } = detailed;
//   return { bannerText, bannerDetailedText, bannerImage, bannerVideo };
// }

// // Function to extract data from overview
// function extractOverviewData(overview) {
//   const { sessionName, sessionDescription, sessionCategory, imageFiles } =
//     overview;
//   return { sessionName, sessionDescription, sessionCategory, imageFiles };
// }

// const apiKeyAuth = (req, res, next) => {
//   const clientApiKey =   req.headers['x-api-key'];   
//   const serverApiKey = process.env.API_KEY;
//   if (!clientApiKey || clientApiKey !== serverApiKey) {  
//     return res.status(401).json({ message: 'Invalid or missing API key' });  
//   } 
//   next();
// };

// app.get("/", apiKeyAuth, async (req, res) => {
//   try {
//     const result = await db.query(
//       "SELECT sessions.*, employee.empName FROM sessions INNER JOIN employee ON sessions.empID = employee.empID"
//     );
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal Server Error");
//   }
// });

// app.post(
//   "/submit/new",
//   apiKeyAuth,
//   upload.fields([
//     { name: "overviewImage" },
//     { name: "bannerImage" },
//     { name: "bannerVideo" },
//   ]),
//   async (req, res) => {
//     try {
//       const payload = JSON.parse(req.body.json); // Parse the JSON data

//       const overviewImageFile = req.files["overviewImage"]
//         ? req.files["overviewImage"][0]
//         : null;
//       const bannerImageFile = req.files["bannerImage"]
//         ? req.files["bannerImage"][0]
//         : null;
//       const bannerVideoFile = req.files["bannerVideo"]
//         ? req.files["bannerVideo"][0]
//         : null;

//       console.log("Overview Image File: ", overviewImageFile);
//       console.log("Banner Image File: ", bannerImageFile);
//       console.log("Banner Video File: ", bannerVideoFile);
//       console.log("Payload: \n", payload);

//       const overviewImageUrl = overviewImageFile
//         ? await uploadFilesToAzure(overviewImageFile)
//         : null;
//       const bannerImageUrl = bannerImageFile
//         ? await uploadFilesToAzure(bannerImageFile)
//         : null;
//       const bannerVideoUrl = bannerVideoFile
//         ? await uploadFilesToAzure(bannerVideoFile)
//         : null;

//       insertInDatabase(
//         payload,
//         overviewImageUrl,
//         bannerImageUrl,
//         bannerVideoUrl
//       );

//       res.writeHead(201);
//       res.end(
//         JSON.stringify({
//           message: "data uploaded and metadata stored successfully",
//           status: res.statusCode,
//         })
//       );
//     } catch (error) {
//       res.writeHead(500);
//       res.end(
//         JSON.stringify({
//           message: "internal server error or something:",
//           error,
//         })
//       );
//       console.log(error);
//     }
//   }
// );

// const port = process.env.PORT || 5000;
// app.listen(5000, () => {
//   console.log("Server is running on port 5000");
// });

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const db = require("./db");
const { saveFileLocally, insertInDatabase } = require("./handler");

const app = express();

/**
 * ============================================
 * SWAGGER CONFIG
 * ============================================
 */
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Session Upload API",
      version: "1.0.0",
      description:
        "API for uploading and fetching session content for TCS Paceport Playlist V1",
    },
    servers: [{ url: "http://localhost:5001" }],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-api-key",
        },
      },
      schemas: {
        Session: {
          type: "object",
          properties: {
            sessionid: { type: "integer", example: 1 },
            empid: { type: "integer", example: 101 },
            empname: { type: "string", example: "Janvi Shah" },
            sessionname: { type: "string", example: "Introduction to React" },
            sessiondescription: {
              type: "string",
              example: "A beginner-friendly session on React fundamentals",
            },
            category: { type: "string", example: "Technology" },
            duration: { type: "string", example: "60" },
            role: { type: "string", example: "Speaker" },
            overviewimageurl: {
              type: "string",
              example: "http://localhost:5001/uploads/overview-abc123.png",
            },
            bannerimageurl: {
              type: "string",
              example: "http://localhost:5001/uploads/banner-abc123.png",
            },
            bannervideourl: {
              type: "string",
              example: "http://localhost:5001/uploads/video-abc123.mp4",
            },
            bannertext: { type: "string", example: "React Fundamentals" },
            bannerdetailedtext: {
              type: "string",
              example: "Deep dive into hooks, state, and components",
            },
          },
        },
        UploadSessionPayload: {
          type: "object",
          description:
            "JSON string (sent as form field named 'json') containing session metadata",
          properties: {
            session: {
              type: "object",
              properties: {
                empID: { type: "string", example: "101" },
                name: { type: "string", example: "Janvi Shah" },
                role: { type: "string", example: "Speaker" },
              },
            },
            overview: {
              type: "object",
              properties: {
                sessionName: {
                  type: "string",
                  example: "Introduction to React",
                },
                sessionDescription: {
                  type: "string",
                  example: "A beginner session on React",
                },
                category: { type: "string", example: "Technology" },
                duration: { type: "string", example: "60" },
              },
            },
            detailed: {
              type: "object",
              properties: {
                bannerText: { type: "string", example: "React Fundamentals" },
                bannerDetailedText: {
                  type: "string",
                  example: "Deep dive into hooks and state",
                },
              },
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "Internal Server Error" },
            error: { type: "string", example: "Error details here" },
          },
        },
        UnauthorizedResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Invalid or missing API key",
            },
          },
        },
        UploadSuccessResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example:
                "Data uploaded and metadata stored locally successfully",
            },
            status: { type: "integer", example: 201 },
            sessionId: { type: "integer", example: 5 },
          },
        },
      },
    },
  },
  apis: ["./app.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /swagger.json:
 *   get:
 *     summary: Download raw Swagger JSON spec
 *     tags:
 *       - Meta
 *     responses:
 *       200:
 *         description: Raw OpenAPI JSON specification
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerDocs);
});

/**
 * ============================================
 * MULTER — IN-MEMORY STORAGE
 * ============================================
 */
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(bodyParser.json({ limit: "1023mb" }));
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/**
 * ============================================
 * API KEY MIDDLEWARE
 * ============================================
 */
const apiKeyAuth = (req, res, next) => {
  const clientApiKey = req.headers["x-api-key"];
  const serverApiKey = process.env.API_KEY;

  if (!clientApiKey || clientApiKey !== serverApiKey) {
    return res.status(401).json({
      message: "Invalid or missing API key",
    });
  }

  next();
};

/**
 * ============================================
 * ROUTES
 * ============================================
 */

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check — confirm V1 backend is running
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: V1 backend is running
 *         content:
 *           application/json:
 *             example:
 *               message: V1 Session Upload backend is running
 *               status: 200
 */
app.get("/health", (req, res) => {
  res.json({
    message: "V1 Session Upload backend is running",
    status: 200,
  });
});

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all uploaded sessions (with employee name joined)
 *     description: >
 *       Returns all sessions stored in the database, joined with the employee
 *       table to include the uploader's name. Requires a valid API key in
 *       the x-api-key header. This endpoint is also consumed by V2 (Reservation
 *       Portal) when building event playlists.
 *     tags:
 *       - Sessions
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: List of all sessions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Session'
 *             example:
 *               - sessionid: 1
 *                 empid: 101
 *                 empname: Janvi Shah
 *                 sessionname: Introduction to React
 *                 sessiondescription: A beginner session on React fundamentals
 *                 category: Technology
 *                 duration: "60"
 *                 role: Speaker
 *                 overviewimageurl: http://localhost:5001/uploads/overview-abc.png
 *                 bannerimageurl: http://localhost:5001/uploads/banner-abc.png
 *                 bannervideourl: http://localhost:5001/uploads/video-abc.mp4
 *                 bannertext: React Fundamentals
 *                 bannerdetailedtext: Deep dive into hooks and state
 *       401:
 *         description: Invalid or missing API key
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
app.get("/", apiKeyAuth, async (req, res) => {
  try {
    const result = await db.query(
      "SELECT sessions.*, employee.empName FROM sessions INNER JOIN employee ON sessions.empID = employee.empID"
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching sessions:", err);
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
});

/**
 * @swagger
 * /submit/new:
 *   post:
 *     summary: Upload a new session with media files
 *     description: >
 *       Accepts a multipart form submission containing:
 *       - A JSON string (field name: `json`) with session metadata (employee info,
 *         session name, description, category, duration, banner text).
 *       - Three file uploads: overviewImage, bannerImage, bannerVideo.
 *
 *       Files are saved locally under `/uploads/`. Metadata is stored in PostgreSQL.
 *       Requires a valid API key in the x-api-key header.
 *     tags:
 *       - Sessions
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - json
 *               - overviewImage
 *               - bannerImage
 *               - bannerVideo
 *             properties:
 *               json:
 *                 type: string
 *                 description: >
 *                   Stringified JSON containing session, overview, and detailed
 *                   fields. See UploadSessionPayload schema for structure.
 *                 example: >
 *                   {"session":{"empID":"101","name":"Janvi Shah","role":"Speaker"},
 *                   "overview":{"sessionName":"Intro to React","sessionDescription":"Beginner React","category":"Technology","duration":"60"},
 *                   "detailed":{"bannerText":"React Fundamentals","bannerDetailedText":"Hooks and State"}}
 *               overviewImage:
 *                 type: string
 *                 format: binary
 *                 description: Card thumbnail image shown on the session list
 *               bannerImage:
 *                 type: string
 *                 format: binary
 *                 description: Full banner image shown on session detail page
 *               bannerVideo:
 *                 type: string
 *                 format: binary
 *                 description: Session video file
 *     responses:
 *       201:
 *         description: Session uploaded and stored successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UploadSuccessResponse'
 *             example:
 *               message: Data uploaded and metadata stored locally successfully
 *               status: 201
 *               sessionId: 5
 *       401:
 *         description: Invalid or missing API key
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
app.post(
  "/submit/new",
  apiKeyAuth,
  upload.fields([
    { name: "overviewImage" },
    { name: "bannerImage" },
    { name: "bannerVideo" },
  ]),
  async (req, res) => {
    try {
      const payload = JSON.parse(req.body.json);

      const overviewImageFile = req.files["overviewImage"]
        ? req.files["overviewImage"][0]
        : null;

      const bannerImageFile = req.files["bannerImage"]
        ? req.files["bannerImage"][0]
        : null;

      const bannerVideoFile = req.files["bannerVideo"]
        ? req.files["bannerVideo"][0]
        : null;

      const overviewImageUrl = await saveFileLocally(overviewImageFile);
      const bannerImageUrl = await saveFileLocally(bannerImageFile);
      const bannerVideoUrl = await saveFileLocally(bannerVideoFile);

      const sessionId = await insertInDatabase(
        payload,
        overviewImageUrl,
        bannerImageUrl,
        bannerVideoUrl
      );

      res.status(201).json({
        message: "Data uploaded and metadata stored locally successfully",
        status: 201,
        sessionId,
      });
    } catch (error) {
      console.error("Error in /submit/new:", error);

      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }
);

/**
 * ============================================
 * START SERVER
 * ============================================
 */
const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});