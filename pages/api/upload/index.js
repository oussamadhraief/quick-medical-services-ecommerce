const cloudinary = require('cloudinary').v2
require('dotenv').config()
const fs = require('fs')

import dbConnect from "../../../utils/dbConnect";

dbConnect()


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

export default async (req,res) => {
    if (req.method !== 'POST') return res.status(400).json({success : false , message :'Only POST request accepted'})

    try {
        // if(!req.body.image || Object.keys(req.body.image).length < 1) 
        // return res.status(400).json({success: false, error: 'Only one image is accepted !'})
        
        
        // const file = req.body.image
        // if(file.mimetype != 'image/jpeg' && file.mimetype !== 'image/png') return res.status(400).json({success: false, error: 'File format is not correct'})
        
        const uploaded = await cloudinary.uploader.upload(req.body,function(error, result) {console.log(result, error)})

            
            // removeTmp(req.body.image)

        console.log(uploaded);
        res.json({success: true})
    } catch (error) {
        res.status(500).json({error: 'what'})
    }
}

const removeTmp = (path) => {
    fs.unlink(path, err => {
        if(err) throw err
    })
}