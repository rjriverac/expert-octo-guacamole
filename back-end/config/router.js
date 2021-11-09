import express from 'express'
import { getAllNft } from '../controllers/nfts.js'

const router = express.Router()

router.route('/all')
  .get(getAllNft)

export default router