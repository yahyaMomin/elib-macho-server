import mongoose from 'mongoose'
import _env from './config'

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log('database connected successfully')
    })
    mongoose.connection.on('error', (err) => {
      console.log('something went wrong on database' + err)
    })
    await mongoose.connect(_env.mongo_url as string)
  } catch (error) {
    console.log('some thing went wrong while connecting with database ' + error)
  }
}

export default connectDB
