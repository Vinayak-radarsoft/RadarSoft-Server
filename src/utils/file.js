require("dotenv").config();
const aws = require("aws-sdk");

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
});

const bucketName = process.env.S3_BUCKET_NAME;

const uploadFile = async (file, optimizeData, existingKey = null) => {
  let folderPath = "Radarsoft/career";

  let key = existingKey || `${folderPath}/${Date.now()}_${file.name}`;
  const contentType = file?.mimetype || "application/octet-stream";

  console.log("uploadFile here..", contentType, file);
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: optimizeData,
    ContentType: contentType,
    ACL: "public-read-write",
  };
  const data = await s3.upload(params).promise();
  console.log("Optimized image uploaded to S3:", data.Location, data.Key);
  return data.Location; // Return S3 URL
};

module.exports = uploadFile;
