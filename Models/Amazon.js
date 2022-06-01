const mongoose = require('mongoose')
import { isEmail } from 'validator';
const AmazonSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bambi',
      required: true
    },

    cart: {
      type: [
      {
        _id: false,
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Instrument' },
        size: Number,
        quantity: { type: Number, default: 1 },
      },
    ],
    required: true,
    default: []
  },
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
    address: 
    [{ type: String,
      trim: true,
      required: [true, "L'adresse est obligatoire"],
      default: null }],
    city: 
    [{ type: String,
      trim: true,
      required: [true, "La ville est obligatoire"],
      default: null }],
    country: 
    [{ type: String,
      trim: true,
      required: [true, "Le pays est obligatoire"],
      default: null }],
    zipCode: 
    [{ type: String,
      trim: true,
      required: [true, "Le code postal est obligatoire"],
      default: null }],
    name: { type: String, trim: true, required: true },
    phoneNumber: {
      type: String,
      minlength: [4, 'Insérez un numéro de téléphone valide'],
      default: null,
      required: true
    },
    note: { type: String, trim: true },
    status: {
      type: String,
      default: 'En cours',
      required: true
    }
  },
  { timestamps: true }
)

module.exports =
mongoose.models.Amazon || mongoose.model('Amazon', AmazonSchema)
