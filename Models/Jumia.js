const mongoose = require('mongoose')
import { isEmail } from 'validator';
const JumiaSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Docteur',
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
    address: [{ type: String }],
    city: [{ type: String }],
    country: [{ type: String }],
    zipCode: [{ type: Number }],
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
mongoose.models.Jumia || mongoose.model('Jumia', JumiaSchema)
