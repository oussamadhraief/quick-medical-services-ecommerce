const mongoose = require('mongoose')
import { isEmail } from 'validator';

const PrvSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        trim: true,
        minlength: [4, 'Please enter a valid name']
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true,'Email address is required'],
        validate: [isEmail, 'Please fill a valid email address']
    },
    phoneNumber:{
        type:String,
        trim:true,
        required : [true , 'Phone number is required'],
        minlength :[8 , 'Please enter a valid number']
    },
    subject:{
        type:String,
        trim : true,
        required : [true,'Subject is required']
    },
    message: {
        type: String,
        required: [true, 'Please enter a message'],
        trim: true,
        maxlength: [400, 'Message is too long'],
        minlength: [4, 'Please enter a valid message']
    },
    isReview :{
        type : Boolean,
        required : true , 
        default: false
    },
},
{ timestamps: true })

module.exports = mongoose.models.Prv || mongoose.model('Prv' , PrvSchema)