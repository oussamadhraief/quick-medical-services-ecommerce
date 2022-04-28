const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "L'adresse email est obligatoire"],
      match: [
          /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/,
          "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: [true, " Insérez votre adresse"],
      trim: true,
      default: null
    },
    phoneNumber: {
        type: String,
        required: [true, "Insérez votre numéro de téléphone"],
        minlength: [4, "Insérez un numéro de téléphone valide"],
        default: null
    },
    name: {
      type: String,
      default: "guest"
    },
    isAdmin: {
      type: Boolean,
      default: 0
    },
  },
  { timestamps: true }
)
module.exports = mongoose.models.User || mongoose.model('User', UserSchema)
