const mongoose = require('mongoose')
const CommandeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Docteur',
      required: true
    },

    cart: [
      {
        // _id : false,
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Instrument' },
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
    archived: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  { timestamps: true }
)

module.exports =
  mongoose.models.Commande || mongoose.model('Commande', CommandeSchema)
