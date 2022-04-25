const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      default: true
    },
    isAdmin: {
      type: Boolean,
      default: 0
    },
  },
  { timestamps: true }
)
module.exports = mongoose.models.User || mongoose.model('User', UserSchema)
