import dbConnect from '../../../utils/dbConnect'
import Feedback from '../../../Models/Contact'

dbConnect()

export default async (req, res) => {
    try {
        const Feedbacks = await Feedback.find({isReview: true}).sort({createdAt: -1}).select({name: 1, message: 1})

        res.status(200).json({ success: true, data: Feedbacks })

    } catch (error) {

        res.status(400).json({ success: false })
        
    }   
}
