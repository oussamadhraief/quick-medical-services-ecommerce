import { db } from '../../../../Models/Instrument'
import dbConnect from '../../../../utils/dbConnect'

dbConnect()

const getCategory =  async (req,res) => {

    let id = req.query.id

    id = id.charAt(0).toUpperCase() + id.slice(1).toLowerCase();

    try {
        const Instruments = await db.collection('instruments').find({ category: id }).sort({createdAt: -1}).toArray();
        
        if(!Instruments){
            res.status(400).json({ success: false })
        }

        res.status(200).json({ success: true, data: Instruments })
    } catch (error) {
        res.status(400).json({ success: false });
    }
}

export default getCategory