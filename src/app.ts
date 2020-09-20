import express, { Application } from 'express'
import dotenv from 'dotenv'
import recordsRouter from './routes/records.routes'

dotenv.config()

const port = process.env.PORT || 7000
const app: Application = express()

app.use(express.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', '*')
  next()
})

app.use('/', recordsRouter)

app.listen(port, () => console.log(`Server has been started on port ${port}`))