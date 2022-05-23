const mongoose = require('mongoose')
import { isEmail } from 'validator';

const TesteurSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "L'adresse email est obligatoire"],
      validate: [
        isEmail,
        'Please fill a valid email address'
      ]
    },
    password: {
      type: String,
      required: true
    },
    address: 
    [{ type: String,
      trim: true,
      default: null }],
    city: 
    [{ type: String,
      trim: true,
      default: null }],
    country: 
    [{ type: String,
      trim: true,
      default: null }],
    zipCode: 
    [{ type: String,
      trim: true,
      default: null }],
    phone: {
      type: String,
      required: [true, "L'adresse email est obligatoire"],
      minlength: [4, 'Insérez un numéro de téléphone valide'],
      default: null
    },
    name: {
      type: String,
      default: 'guest'
    },
    isAdmin: {
      type: Boolean,
      default: 0
    },
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Instrument' }],
    ordersHistory : [{type: mongoose.Schema.Types.ObjectId, ref: 'Amazon' }],
    estimateHistory : [{type: mongoose.Schema.Types.ObjectId, ref: 'Devis'}] 
  },
  { timestamps: true }
)
module.exports =
  mongoose.models.Testeur || mongoose.model('Testeur', TesteurSchema)
