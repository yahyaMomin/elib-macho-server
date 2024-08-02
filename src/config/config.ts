import { config as conf } from 'dotenv'

conf()
const _env = {
  port: process.env.PORT,
  mongo_url: process.env.MONGODB_URL,
}

export const config = Object.freeze(_env)
