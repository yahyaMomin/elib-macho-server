import express from "express";
import { createBook } from "../controllers/bookController";
import multer from "multer";
import path from "node:path";
import uploadFile from "../middlewares/uploadFile";

const bookRoutes = express.Router();

const upload = multer({
  dest: path.resolve(__dirname, "../../public/data/uploads"),
});
const getFiles = upload.fields([
  { name: "coverImage", maxCount: 1 },
  { name: "file", maxCount: 1 },
]);

bookRoutes.post("/upload", getFiles, uploadFile, createBook);

export default bookRoutes;
