import { v4 as uuid } from 'uuid'
import Nft from '../models/nft.js'

export const getAllNft = async (req, res) => {
  try {
    const nfts = await Nft.find()
    return res.status(200).json(nfts)
  } catch (error) {
    return res.status(404).json({ 'message': 'Not found' })
  }
}

export const addNft = async(req, res) => {
  try {
    const newNft = { ...req.body, owner: req.currentUser._id, token: uuid(), 
      transactions: {
        type: 'minted',
        to: req.currentUser._id,
        price: 0
      } }
    const nftToAdd = await Nft.create(newNft)
    console.log('NFT to add ->', nftToAdd)
    if (!nftToAdd) throw new Error()
    return res.status(201).json(nftToAdd)
  } catch (err) {
    console.log(err)
    return res.status(422).json(err)
  }
}

export const getSingleNft = async (req, res) => {
  try {
    const { id } = req.params
    const singleNft = await Nft.findById(id).populate('owner')
    if (!singleNft) throw new Error()
    return res.status(200).json(singleNft)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ 'message': 'not found' })
  }
}

export const updateNft = async (req, res) => {
  try {
    const { id } = req.params
    const updatedNft = await Nft.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })
    if (!updatedNft) throw new Error()
    return res.status(202).json(updatedNft)
  } catch (err) {
    return res.status(404).json({ 'message': 'not found' })
  }
}

