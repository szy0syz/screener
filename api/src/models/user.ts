import mongoose from 'mongoose'

const { Schema }  = mongoose

const userSchema = new Schema({
  goodleId: String
})

const User = mongoose.model('users', userSchema);

export { User }
