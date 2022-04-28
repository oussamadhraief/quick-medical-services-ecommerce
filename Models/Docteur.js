const mongoose = require('mongoose')
const DocteurSchema = new mongoose.Schema(
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
      // required: [true, "L'adresse email est obligatoire"],
      trim: true,
      default: null
    },
    phone: {
        type: String,
        // required: [true, "L'adresse email est obligatoire"],
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
module.exports = mongoose.models.Docteur || mongoose.model('Docteur', DocteurSchema)
