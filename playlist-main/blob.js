// import { BlobServiceClient } from '@azure/storage-blob';
// import 'dotenv/config';
require('dotenv').config();  
const { BlobServiceClient } = require("@azure/storage-blob");
const crypto = require('crypto')

//const dotenv = require('dotenv/config')

const accountName = process.env.ACCOUNT_NAME;
const sasToken = process.env.SAS_TOKEN;
const containerName = process.env.CONTAINER_NAME;
const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net/?${sasToken}`);
const containerClient = blobServiceClient.getContainerClient(containerName);

const handleImageUpload = async (req, res) => 
{
    try {
        // Extract metadata from headers
        const { id, fileName, caption, fileType } = await extractMetadata(req.headers);
  
        // Upload the image to Azure Storage Blob as a stream
        const imageUrl = await uploadImageStreamed(fileName, req);
  
        res.writeHead(201);
        res.end(JSON.stringify({ message: 'media uploaded and metadata stored successfully', imageUrl }));
        return [id,fileName, caption, fileType, imageUrl]
      } catch (error) {
        console.error('Error:', error);
        res.writeHead(500);
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
      }
}

async function extractMetadata(headers){
    const id = crypto.randomBytes(6).toString("hex");
    const contentType = headers['content-type'];
    const fileType = contentType.split('/')[1];
    const contentDisposition = headers['content-disposition'] || '';
    const caption = headers['x-image-caption'] || 'No caption provided';
    const matches = /filename="([^"]+)"/i.exec(contentDisposition);
    const fileName = matches?.[1] || `media-${Date.now()}.${fileType}`;
    return { id, fileName, caption, fileType };
}

async function uploadImageStreamed(blobName, dataStream) 
{
    const blobClient = containerClient.getBlockBlobClient(blobName);
    await blobClient.uploadStream(dataStream);
    return blobClient.url;
}

module.exports = {
    handleImageUpload
}