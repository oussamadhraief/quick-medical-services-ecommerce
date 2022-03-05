import dbConnect from "../../../utils/dbConnect";
import Feedback,{db} from "../../../Models/Contact";



dbConnect()

export default async (req,res) => {
    switch (req.method){
        case 'GET' :
            try{
                const data = await Feedback.find({});
                res.status(200).json({success : true , data : data})
            }
            catch (error) {
                res.status(400).json({success : false})
            }
        case 'POST':
            try {
                const data = await Feedback.create(req.body)
                res.status(201).json({success : true , data : data})
            }
            catch(error){
                res.status(400).json({success : false })
            }
        case 'PUT':
            try {
                const data = await Feedback.findOneAndUpdate({_id : req.body._id},req.body,{new :true})
                res.status(200).json({success :true , data :data })
            }
            catch(error){
                res.status(400).json({success :false})
            }

    }
}