import { config } from 'dotenv'

config()
const _env = {
  port: process.env.PORT,
  mongo_url: process.env.MONGO_CONNECTION_STRING,
  node_env: process.env.NODE_ENV,
  jwt_secret: process.env.JWT_SECRET,
}

export default Object.freeze(_env)
