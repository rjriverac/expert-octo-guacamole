import mongoose from 'mongoose'

const nftSchema = new mongoose.Schema({
  token: { type: String },
  image: { type: String, required: true, unique: true },
  category: { type: String },
  name: { type: String, required: true, unique: true },
  transactions: [transactionSchema]
})

const transactionSchema = new mongoose.Schema({
  type: { type: String, required: true },
  from: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  to: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  price: { type: Number, required: true }
},
{
  timestamps: true
})

export default mongoose.model('Nft',nftSchema)