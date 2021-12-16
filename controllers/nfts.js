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


export const deleteAnNft = async (req, res) => {
  try {
    const { id } = req.params
    const nftToDelete = await Nft.findOneAndDelete({ _id: id })
    if (!nftToDelete) throw new Error()
    return res.sendStatus(204)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ 'message': 'not found' })
  }
}

export const updateNft = async (req, res) => {
  try {
    const { id } = req.params
    const { transactions = [], ...update } = req.body

    const findNft = await Nft.findById(id)

    if (!findNft) throw new Error()
    if (transactions.type) {
      await Nft.findOneAndUpdate(
        { _id: id },
        { $push: {
          transactions
        }
        },
        { returnDocument: 'after' }
      )
    } 
    const updatedNft = await Nft.findOneAndUpdate({ _id: id }, { ...update }, { returnDocument: 'after' })
    if (!updatedNft) throw new Error()
    return res.status(202).json(updatedNft)
    
    
  } catch (err) {
    return res.status(404).json({ 'message': 'not found' })
  }
}


