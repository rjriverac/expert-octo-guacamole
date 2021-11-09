import Nft from '../models/nft.js'

export const getAllNft = async (req, res) => {
  try {
    const nfts = await Nft.find()
    return res.status(200).json(nfts)
  } catch (error) {
    return res.status(404).json({ 'message': 'Not found' })
  }
}