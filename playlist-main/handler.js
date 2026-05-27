// require('dotenv').config();  
// const { BlobServiceClient } = require('@azure/storage-blob');  
// const fs = require('fs');  
// const path = require('path');  
// const crypto = require('crypto')
// const db = require('./db')

// const { insertSession, upsertEmployee } = require('./queries') 
  
// // const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.SAS_TOKEN);  
// // const containerName = process.env.CONTAINER_NAME;
// //const containerClient = blobServiceClient.getContainerClient(containerName);  
// const accountName = process.env.ACCOUNT_NAME;
// const sasToken = process.env.SAS_TOKEN;
// const containerName = process.env.CONTAINER_NAME;

// const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net/?${sasToken}`);
// const containerClient = blobServiceClient.getContainerClient(containerName);

// const uploadFilesToAzure = async (file) => {  
//     if (!file || !file.buffer) {  
//         throw new Error("File buffer is not available");  
//     }  
  
//     const blobName = `${Date.now()}-${file.originalname}`; // Unique name for the blob  
//     const stream = require('stream').Readable.from(file.buffer); // Convert buffer to stream  
//     const blockBlobClient = containerClient.getBlockBlobClient(blobName);  
//     const FOUR_MEGABYTES = 4 * 1024 * 1024;  
//     const uploadOptions = { 
//         bufferSize: FOUR_MEGABYTES, 
//         maxBuffers: 5,
//         onProgress: (progress) => {  
//             console.log(`Uploaded ${progress.loadedBytes} of ${file.size} bytes`);  
//         } 
//     };  
    
//     try {  
//         await blockBlobClient.uploadStream(stream, uploadOptions.bufferSize, uploadOptions.maxBuffers, {  
//         blobHTTPHeaders: { blobContentType: file.mimetype }, 
//         onProgress: uploadOptions.onProgress 
//         })
//         console.log("File Saved to Azure Blob Storage");  
  
//         const url = blockBlobClient.url; // Get the URL of the uploaded blob  
//         return url; // Return the URL  
//     } catch (error) {  
//         console.log("Error uploading to Azure Blob Storage", error);  
//         throw error; // Rethrow the error for caller to handle  
//     }  
// }  

// const insertInDatabase = async (payload, overviewImageFile, bannerImageFile, bannerVideoFile) => {
//     try {
//         const id = crypto.randomBytes(6).toString("hex");
//         const { session, detailed, overview } = payload

//         const employeeData = await db.query(upsertEmployee, [session.empID, session.name, session.role])
//         console.log(employeeData)

//         const sessionData = await db.query(insertSession, [id, session.empID, overview.sessionName, detailed.bannerText, detailed.bannerDetailedText, bannerImageFile, bannerVideoFile, overview.category, overview.duration, overview.sessionDescription, overviewImageFile])
//         console.log(sessionData)
//         console.log("stored in sql db")
//     } catch (error) {
//         console.log(error)
//         console.log("error in uploading data to sql db server")
//     }
// }


  
// module.exports = { 
//     uploadFilesToAzure,
//     insertInDatabase
//  };

require("dotenv").config();

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const db = require("./db");

const { insertSession, upsertEmployee } = require("./queries");

const uploadsDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const saveFileLocally = async (file) => {
  if (!file || !file.buffer) {
    return null;
  }

  const safeOriginalName = file.originalname.replace(/\s+/g, "-");
  const fileName = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}-${safeOriginalName}`;
  const filePath = path.join(uploadsDir, fileName);

  await fs.promises.writeFile(filePath, file.buffer);

  return `${process.env.BASE_URL || "http://localhost:5001"}/uploads/${fileName}`;
};

const insertInDatabase = async (
  payload,
  overviewImageFile,
  bannerImageFile,
  bannerVideoFile
) => {
  try {
    const id = crypto.randomBytes(6).toString("hex");
    const { session, detailed, overview } = payload;

    await db.query(upsertEmployee, [
      session.empID,
      session.name,
      session.role,
    ]);

    await db.query(insertSession, [
      id,
      session.empID,
      overview.sessionName,
      detailed.bannerText,
      detailed.bannerDetailedText,
      bannerImageFile,
      bannerVideoFile,
      overview.category,
      overview.duration,
      overview.sessionDescription,
      overviewImageFile,
    ]);

    console.log("Stored session metadata in local PostgreSQL");

    return id;
  } catch (error) {
    console.error("Error inserting session into PostgreSQL:", error);
    throw error;
  }
};

module.exports = {
  saveFileLocally,
  insertInDatabase,
};