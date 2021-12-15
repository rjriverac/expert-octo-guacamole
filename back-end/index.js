import express from 'express'
import { dbURI, port } from './config/environment.js'
import mongoose from 'mongoose'
import router from './config/router.js'

const app = express()

const startServer = async () => {
  try {
    await mongoose.connect(dbURI)
    console.log('🚀 database connected')
    app.use((req,_res,next) => {
      console.log(`🚨🚨 Incoming request ${req.method} = ${req.url}`)
      next()
    })
    app.use(express.json())
    app.use('/api',router)
    app.listen(port,() => console.log(`🍾 Server listening on port ${port}`))
  } catch (error) {
    console.log(error)
    console.log('🚨 something has gone wrong')
  }
}
startServer()