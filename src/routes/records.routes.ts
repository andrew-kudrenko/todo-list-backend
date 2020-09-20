import { Router } from 'express'
import { Connection } from 'mongoose'
import { createConnection } from '../helpers/mongodb.helpers'
import { recordSchema } from '../models/Record.models'

const router = Router();

(async () => {
  const connection: Connection = await createConnection('records')
  const Record = connection.model('Record', recordSchema)

  router.route('/records')
    .get(async (req, res) => {
      try {
        res.json(await Record.find({}))
      } catch (e) {
        res.status(500).json(e)
      }
    })
    .post(async (req, res) => {
      try {
        console.log(req.body)
        const { _id, title } = req.body
        const found = await Record.findById(_id)

        if (!found && title.length) {
          await new Record({ ...req.body }).save()
          return res.status(201).json(null)
        }

        res.json(`Record ${_id} is already exists`)

      } catch (e) {
        res.status(500).json(e)
      }
    })
    .delete(async (req, res) => {
      try {
        const { _id } = req.body
        await Record.findByIdAndDelete(_id)
        res.json(`Record ${_id} has been deleted`)
      } catch (e) {
        res.status(500).json(e)
      }
    })
})()

export default router