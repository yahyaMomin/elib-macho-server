import { NextFunction, Request, Response } from "express";
import path from "node:path";
import cloudinary from "../config/cloudinary";
import fs from "node:fs";

const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const coverImage = files.coverImage[0];
    const pdfFile = files.file[0];

    const coverImageMimeType = coverImage.mimetype.split("/").at(-1);
    const imageName = coverImage.filename;
    const imagePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      imageName
    );
    const ImageUploadResult = await cloudinary.uploader.upload(imagePath, {
      filename_override: imageName,
      folder: "coverImages",
      format: coverImageMimeType,
    });
    const pdfMimeType = pdfFile.mimetype.split("/").at(-1);
    const pdfName = pdfFile.filename;
    const pdfPath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      pdfName
    );
    const pdfUploadResult = await cloudinary.uploader.upload(pdfPath, {
      filename_override: pdfName,
      folder: "pdf",
      format: pdfMimeType,
    });

    await fs.promises.unlink(imagePath);
    await fs.promises.unlink(pdfPath);

    req.body.coverImageUrl = ImageUploadResult.secure_url;
    req.body.pdfUrl = pdfUploadResult.secure_url;
    next();
  } catch (error) {
    console.log(error);
  }
};
export default uploadFile;

// file upload with firebase
// const coverImagePath = `coverImages/${coverImageFile.originalname}`;
// const coverImageBlob = bucket.file(coverImagePath);
// const coverImageBlobStream = coverImageBlob.createWriteStream({
//   metadata: {
//     contentType: coverImageFile.mimetype,
//   },
// });

// coverImageBlobStream.end(coverImageFile.buffer);

// // Upload PDF
// const pdfPath = `PDF/${pdfFile.originalname}`;
// const pdfBlob = bucket.file(pdfPath);
// const pdfBlobStream = pdfBlob.createWriteStream({
//   metadata: {
//     contentType: pdfFile.mimetype,
//   },
// });

// pdfBlobStream.end(pdfFile.buffer);

// Wait for both uploads to finish
// await new Promise<void>((resolve, reject) => {
//   let finishCount = 0;
//   const handleFinish = () => {
//     finishCount++;
//     if (finishCount === 2) resolve();
//   };

//   coverImageBlobStream.on("finish", handleFinish).on("error", reject);
//   pdfBlobStream.on("finish", handleFinish).on("error", reject);
// });

// const coverImageUrl = `https://storage.googleapis.com/${bucket.name}/${coverImageBlob.name}`;
// const pdfUrl = `https://storage.googleapis.com/${bucket.name}/${pdfBlob.name}`;

// console.log(coverImageUrl);
// console.log(pdfUrl);
