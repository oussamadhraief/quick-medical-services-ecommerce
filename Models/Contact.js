const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
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
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
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
        minlength: [4, 'Please enter a valid message']
    },
    isRead :{
        type : Boolean,
        required : true , 
        default: false
    },
    isReview :{
        type : Boolean,
        required : true , 
        default: false
    },
})

module.exports = mongoose.models.Feedback || mongoose.model('Feedback' , ContactSchema)