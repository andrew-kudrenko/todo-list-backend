import { Schema, model } from 'mongoose'

export const recordSchema = new Schema({
  _id: String,
  title: String,
  date: String,
  completed: Boolean
})

export default model('Record', recordSchema)