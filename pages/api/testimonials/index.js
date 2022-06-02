import dbConnect from '../../../utils/dbConnect'
import Prv from '../../../Models/Prv'

dbConnect()

export default async (req, res) => {
    try {
        const Prvs = await Prv.find({isReview: true}).sort({createdAt: -1}).select({name: 1, message: 1})

        res.status(200).json({ success: true, data: Prvs })

    } catch (error) {

        res.status(400).json({ success: false })
        
    }   
}
