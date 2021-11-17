import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import uniqueValidator from 'mongoose-unique-validator'

const cartItem = new mongoose.Schema({
  item: { type: mongoose.Schema.ObjectId, ref: 'Nft', required: true, unique: true, sparse: true }
})

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, maxlength: 30 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: [cartItem]
},
{
  timestamps: true
})

userSchema.virtual('owned', {
  ref: 'Nft',
  localField: '_id',
  foreignField: 'owner'
})

userSchema.set('toJSON', {
  virtuals: true,
  transform(_doc,json) {
    delete json.password
    return json
  }
})

cartItem.virtual('details', {
  ref: 'Nft',
  localField: 'cartItem',
  foreignField: '_id'
})

cartItem.set('toJson',{
  virtuals: true
})

userSchema
  .virtual('passwordConfirmation')
  .set(function(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

userSchema
  .pre('validate', function(next){
    if (this.isModified('password') && this.password !== this._passwordConfirmation) {
      this.invalidate('passwordConfirmation','does not match')
    }
    next()
  })

userSchema
  .pre('save', function(next){
    if (this.isModified('password')){
      this.password = bcrypt.hashSync(this.password,bcrypt.genSaltSync())
    }
    next()
  })

userSchema.methods.validatepw = function(password) {
  return bcrypt.compareSync(password, this.password) 
}

userSchema.plugin(uniqueValidator)

export default mongoose.model('User',userSchema)