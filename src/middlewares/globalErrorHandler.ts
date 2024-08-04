import { NextFunction, Request, Response } from 'express'
import { HttpError } from 'http-errors'
import _env from '../config/config'

const globalErrorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
  return res.status(err.statusCode).json({
    status: 'error',
    message: err.message,
    stack: _env.node_env === 'development' ? err.stack : '',
  })
}

export default globalErrorHandler
