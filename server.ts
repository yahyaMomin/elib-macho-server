import app from './src/app'
import connectDB from './src/config/db'
import _env from './src/config/config'

const startServer = async () => {
  await connectDB()

  const port = _env.port || 1122

  app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
  })
}
startServer()
