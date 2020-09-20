import express, { Application } from 'express'
import config from 'config'
import bodyParser from 'body-parser'
import recordsRouter from './routes/records.routes'

const port = config.get('port') || 7000
const app: Application = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', '*')
  next()
})

app.use('/', recordsRouter)

app.listen(port, () => console.log(`Server has been started on port ${port}`))