const mongoose = require('mongoose')
import { isEmail } from 'validator';
const CommandeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Docteur',
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

    clinicName: {
      type: String,
      required: [true, 'Insérez le nom de la  clinic'],
      trim: true
    },
    taxRegistrationNumber: {
      type: String,
      required: [true, 'Le numéro de matricule fiscale est obligatoire'],
      trim: true
    },
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
    address: [{ type: String }],
    name: { type: String, trim: true },
    phoneNumber: {
      type: String,
      minlength: [4, 'Insérez un numéro de téléphone valide'],
      default: null
    },
    note: { type: String, trim: true },
    status: {
      type: String,
      default: 'processing'
    }
  },
  { timestamps: true }
)

module.exports =
  mongoose.models.Commande || mongoose.model('Commande', CommandeSchema)
