import { Request, Response, NextFunction } from "express";
import bookModel from "../models/bookModel";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, genre, coverImageUrl, pdfUrl } = req.body;

    const genres = genre.split(" ");

    const newBook = new bookModel({
      title,
      author: "66af2a042764bb7fa18e3396",
      coverImage: coverImageUrl,
      file: pdfUrl,
      genre: genres,
    });
    await newBook.save();

    res.status(200).json({ id: newBook._id });
  } catch (error) {
    console.log(error);
  }
};
export { createBook };
