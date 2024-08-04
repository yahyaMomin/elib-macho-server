import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import userModel from '../models/userModel'
import bcrypt from 'bcrypt'
import { sign } from 'jsonwebtoken'
import _env from '../config/config'

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) return next(createHttpError(400, 'all fields are required'))

    const user = await userModel.findOne({ email: email })

    if (user) return next(createHttpError(400, 'user already exist with this email'))

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const newUser = await userModel.create({
      name,
      email,
      password: hashPassword,
    })
    const token = sign({ sub: newUser._id }, _env.jwt_secret as string, { expiresIn: '7d' })

    res.status(200).json({ accessToken: token })
  } catch (error) {
    next(createHttpError(500, 'some thing went wrong in server ' + error))
  }
}

export { register }
