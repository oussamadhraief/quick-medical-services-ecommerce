const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    reference: {
        type: String,
        required: true,
        trim: true,
        minlength: [5, 'La référence doit être au moins 5 caractères']
    },
    name: {
        type: String,
        required: [true, 'Insérez un nom'],
        unique: true,
        trim: true,
        minlength: [2, 'Le nom doit être au moins 2 caractères']
    },
    sizes: {
        type: [Number],
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: [true, 'Insérez la catégorie'],
        unique: false,
        trim: true,
        minlength: [4, 'La catégorie doit être au moins 4 caractères']

    },
    subCategory: {
        type: String,
        required: [true, 'Insérez la sous-catégorie'],
        unique: false,
        trim: true,
        minlength: [4, 'La sous-catégorie doit être au moins 4 caractères']
    },
    availability: {
        type: String,
        required: [true, 'Insérez la disponibilité'],
        unique: false,
    }
})

module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema)