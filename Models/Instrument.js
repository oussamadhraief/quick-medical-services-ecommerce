const mongoose = require("mongoose");
const InstrumentSchema = new mongoose.Schema(
    {
        reference: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: [5, "La référence doit être au moins 5 caractères"],
        },
        name: {
            type: String,
            required: [true, "Insérez un nom"],
            unique: true,
            trim: true,
            minlength: [2, "Le nom doit être au moins 2 caractères"],
        },
        sizes: {
            type: [Number],
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        category: {
            type: String,
            required: [true, "Insérez la catégorie"],
            unique: false,
            trim: true,
            minlength: [4, "La catégorie doit être au moins 4 caractères"],
        },
        subcategory: {
            type: String,
            required: [true, "Insérez la sous-catégorie"],
            unique: false,
            trim: true,
            minlength: [4, "La sous-catégorie doit être au moins 4 caractères"],
        },
        availability: {
            type: String,
            required: [true, "Insérez la disponibilité"],
            unique: false,
        },
        image: {
            type: String,
            required: [true, "Insérez une image"],
            unique: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.models.Instrument || mongoose.model("Instrument", InstrumentSchema);
