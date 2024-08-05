// Configuration
import { v2 as cloudinary } from "cloudinary";
import _env from "./config";

cloudinary.config({
  cloud_name: _env.cloud_name,
  api_key: _env.api_key,
  api_secret: _env.api_secret,
});

export default cloudinary;
