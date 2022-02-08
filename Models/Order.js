const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "Insérez votre nom"],
            trim: true,
            maxlength: [20, "Le nom  ne doit pas  dépasser 20 caractères"],
        },
        lastName: {
            type: String,
            required: [true, "Insérez votre prénom"],
            trim: true,
            maxlength: [20, "Le prénom  ne doit pas  dépasser 20 caractères"],
        },
        // date: {
        //     type: Date,
        //     default: Date.now,
        // },
        cart: {
            type: String,
        },
        adress: {
            type: String,
            required: [true, " Insérez votre adresse"],
            trim: true,
        },
        phoneNumber: {
            type: String,
            required: [true, "Insérez votre numéro de téléphone"],
        },
        clinicName: {
            type: String,
            required: [true, "Insérez le nom de la  clinic"],
            trim: true,
        },
        taxRegistrationNumber: {
            type: String,
            required: [true, "Le numéro de matricule fiscale est obligatoire"],
            trim: true,
        },
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
        archived: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports =
    mongoose.models.Order || mongoose.model("Order", OrderSchema);
