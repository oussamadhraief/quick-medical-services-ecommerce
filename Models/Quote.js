const mongoose = require('mongoose')
import { isEmail } from 'validator';
const QuoteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brimstone',
      required: true
    },

    cart: [
      {
        _id: false,
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Instrument' },
        size: Number,
        quantity: { type: Number, default: 1 }
      }
    ],
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
    name: { type: String, trim: true },
    phoneNumber: {
      type: String,
      minlength: [4, 'Insérez un numéro de téléphone valide'],
      default: null
    },
    note: { type: String, trim: true },
    message: { type: String, trim: true, default: null },
    price: { type: Number, trim: true, default: null },
    status: {
      type: String,
      default: 'En cours'
    }
  },
  { timestamps: true }
)

module.exports =
  mongoose.models.Quote || mongoose.model('Quote', QuoteSchema)
