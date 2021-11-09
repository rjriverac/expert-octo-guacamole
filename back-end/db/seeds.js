import User from '../models/user.js'
import userData from './data/user.js'
import nftData from './data/nft.js'
import Nft from '../models/nft.js'
import mongoose from 'mongoose'
import { dbURI } from '../config/environment.js'
import { v4 as uuid } from 'uuid'

const seedDB = async () => {
  try {
    await mongoose.connect(dbURI)
    console.log('🍾 connected to DB')

    await mongoose.connection.db.dropDatabase()
    console.log('💣 database dropped')

    const users = await User.create(userData)
    console.log(`🌱 successful with ${users.length} users added`)

    const nfts = nftData.map(nft => {
      nft.owner = users[0]._id
      nft.token = uuid()
      nft.transactions = {
        type: 'minted',
        to: users[0]._id,
        price: 0
      }
      return nft
    })

    const nftAdd = await Nft.create(nfts)
    console.log(`🌱 successful with ${nftAdd.length} nfts added`)

    await mongoose.connection.close()
    console.log('🔚 connection closed')

  } catch (error) {
    console.log(error)
    console.log('😓 something went wrong with seeding')
    await mongoose.connection.close()
    console.log('🔚 connection closed')
  }
}

seedDB()