import mongoose from 'mongoose'
import config from 'config'

const uri = config.get('mongouri') as string

const connectionOptions = {
  useFindAndModify: false,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}

export const createConnection = async (endPoint: string): Promise<mongoose.Connection> => {
  try {
    return await mongoose.createConnection(`${uri}/${endPoint}`, connectionOptions)
  } catch (e) {
    throw new Error('Connection wasn\'t created')
  }
}

export const disconnect = async (): Promise<void> => {
  try {
    await mongoose.disconnect()
  } catch (e) {
    throw new Error('Connection wasn\'t disconnected')
  }
}