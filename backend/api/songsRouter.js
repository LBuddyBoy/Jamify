import express from "express";
import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { createSong } from "#db/query/songs";
import requireBody from "#middleware/requireBody";

const router = express.Router();
const upload = multer();

const s3 = new S3Client({
  region: process.env.AWS_REGION, // now using env var
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

router.post("/", upload.single("file"), async (req, res) => {
  const file = req.file;
  const { title } = req.body;
  const params = {
    Bucket: "jamify-files",
    Key: `songs/${Date.now()}_${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    await s3.send(new PutObjectCommand(params));
    const file_url = `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
    const song = await createSong({ title, file_url });

    res.json(song);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "File upload failed." });
  }
});

export default router;
