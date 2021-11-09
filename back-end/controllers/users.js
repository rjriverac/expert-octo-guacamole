import User from '../models/user.js'

export const getUserInfo = async (req,res) => {
  try {
    const user = await (await User.findById(req.currentUser._id)).populate('owned')
    if (!user) throw new Error()
    return res.status(202).json(user)
  } catch (error) {
    res.status(404)
  }
}