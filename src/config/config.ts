import { config } from "dotenv";

config();
const _env = {
  port: process.env.PORT,
  mongo_url: process.env.MONGO_CONNECTION_STRING,
  node_env: process.env.NODE_ENV,
  jwt_secret: process.env.JWT_SECRET,
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
};

export default Object.freeze(_env);
