import express from 'express'
import { register } from '../controllers/userController'

const userRoute = express.Router()

userRoute.post('/register', register)

export default userRoute
