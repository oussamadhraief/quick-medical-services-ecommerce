import { db } from '../../../../Models/Instrument'
import dbConnect from '../../../../utils/dbConnect'

dbConnect()

const getSubcategory =  async (req,res) => {

    let id = req.query.id
    let subcategoryId = req.query.subcategoryId

    id = id.charAt(0).toUpperCase() + id.slice(1).toLowerCase();
    subcategoryId = subcategoryId.charAt(0).toUpperCase() + subcategoryId.slice(1).toLowerCase();

    try {
        const Instruments = await db.collection('instruments').find({ category: id , subcategory: subcategoryId }).sort({createdAt: -1}).toArray()
        
        if(!Instruments){
            res.status(400).json({ success: false, data: id, id: subcategoryId })
        }

        res.status(200).json({ success: true, data: Instruments })
    } catch (error) {
        res.status(400).json({ success: false, data: id, id: subcategoryId })
    }
}

export default getSubcategory