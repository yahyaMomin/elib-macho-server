import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import _env from "../config/config";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return next(createHttpError(400, "all fields are required"));

    const user = await userModel.findOne({ email: email });

    if (user)
      return next(createHttpError(400, "user already exist with this email"));

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      name,
      email,
      password: hashPassword,
    });
    const token = createAccessToken({ sub: newUser._id });

    res.status(200).json({ accessToken: token });
  } catch (error) {
    next(createHttpError(500, "some thing went wrong in server " + error));
  }
};
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) return next(createHttpError(400, "user not exist"));
    const isMatch = await bcrypt.compare(password, user.password as string);
    if (!isMatch) return next(createHttpError(400, "incorrect password"));
    const token = createAccessToken({ sub: user._id });
    res.status(200).json({ AccessToken: token });
  } catch (error) {
    console.log(error);
  }
};

const createAccessToken = (payload: object) => {
  return sign(payload, _env.jwt_secret as string, { expiresIn: "7d" });
};

export { register, login };
