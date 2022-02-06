const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    reference: {
        type: String,
        required: true,
        trim: true,
        minLength :[5 ,'La référence doit être au moins 5 caractères']
    },
    name :{
        type : String,
        required :[True , 'Insérez un nom'],
        unique :true,
        trim: true,
        minLength :[2, 'Le nom doit être au moins 2 caractères']
    },
    sizes :{
        type : [Number],
        required:True,
        trim: true,
    },
    description: {
        type: String,
        required : false ,
    },
    category : {
        type : String,
        required : [True , 'Insérez la catégorie'],
        unique :false,
        trim :true,
        minLength :[4 , 'La catégorie doit être au moins 4 caractères']

    },
    subCategory : {
        type : String,
        required:[True , 'Insérez la sous-catégorie'],
        unique :false,
        trim :true,
        minLength :[4 , 'La sous-catégorie doit être au moins 4 caractères']
        }

})

module.exports = mongoose.models.Note || mongoose.model('Product',ProductSchema)