const cloudinary = require('cloudinary')
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
        if(!req.files || Object.keys(req.files).length != 1) return res.status(400).json({success: false, error: 'Only one image is accepted !'})
        
        
        const file = req.files.file
        if(file.mimetype != 'image/jpeg' && file.mimetype !== 'image/png') return res.status(400).json({success: false, error: 'File format is not correct'})


        cloudinary.v2.uploader.upload(file.tempFilePath,{folder: 'test'},async(err,result) => {
            if(err) throw err
            
            removeTmp(file.tempFilePath)

            res.json({public_id: result.public_id, url: result.secure_url})
        })
    } catch (error) {
        res.json(500).json({error: error})
    }
}

const removeTmp = (path) => {
    fs.unlink(path, err => {
        if(err) throw err
    })
}