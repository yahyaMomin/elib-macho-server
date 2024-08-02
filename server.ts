import app from './src/app'
import { config } from './src/config/config'
import connectDB from './src/config/db'

const startServer = async () => {
  await connectDB()

  const port = config.port || 1122

  app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
  })
}
startServer()
