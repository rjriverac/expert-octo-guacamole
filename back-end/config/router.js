import express from 'express'
import { loginUser, registeredUser } from '../controllers/auth.js'
import { addNft, getAllNft } from '../controllers/nfts.js'
import { getUserInfo } from '../controllers/users.js'
import { secureRoute } from './secureRoute.js'

const router = express.Router()

router.route('/all')
  .get(getAllNft)
  .post(secureRoute, addNft)

router.route('/register')
  .post(registeredUser)

router.route('/login')
  .post(loginUser)

router.route('/profile')
  .get(secureRoute,getUserInfo)

export default router