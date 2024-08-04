import express from 'express'
import globalErrorHandler from './middlewares/globalErrorHandler'
import userRoute from './routes/userRoutes'

const app = express()

app.use(express.json())

app.use('/api/user', userRoute)

app.use(globalErrorHandler)

export default app
