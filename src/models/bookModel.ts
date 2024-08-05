import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    genre: {
      type: Array,
    },
  },
  { timestamps: true }
);

const bookModel = mongoose.model("book", bookSchema);

export default bookModel;
