import User from '../models/user.js'

export const getUserInfo = async (req,res) => {
  try {
    const user = await User.findById(req.currentUser._id).populate('owned')
    if (!user) throw new Error()
    return res.status(202).json(user)
  } catch (error) {
    res.status(404)
  }
}

export const addToCart = async (req,res) => {
  try {
    const { cart }  = req.body

    const user = await User.findById(req.currentUser._id)

    if (!user) throw new Error()

    const updatedCart = await User.findOneAndUpdate(
      { _id: req.currentUser._id },
      { $push: {
        cart
      }
      },
      { returnDocument: 'after' }
    )
    return res.status(202).json(updatedCart)
  } catch (error) {
    return res.sendStatus(404)
  }
}

export const removeOneFromCart = async (req,res) => {
  try {
    const { item }  = req.body
    const user = await User.findById(req.currentUser._id)
    if (!user) throw new Error()
    const updatedCart = await User.findOneAndUpdate(
      { _id: req.currentUser._id },
      { $pull: { 'cart': { 'item': item._id } } },
      { returnDocument: 'after' }
    )
    return res.status(202).json(updatedCart)
  } catch (error) {
    console.log(error)
    return res.sendStatus(404)
  }
}

export const clearCart = async (req,res) => {

  try {
    const user = await User.findById(req.currentUser._id)
    if (!user) throw new Error()
    const updatedUser = await User.findByIdAndUpdate(req.currentUser._id,
      { $set: { 'cart': [] } },
      { multi: true,returnDocument: 'after' }
    )
    return res.status(202).json(updatedUser)  
  } catch (error) {
    console.log(error)
    return res.sendStatus(404)
  }
}