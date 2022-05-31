import dbConnect from '../../../utils/dbConnect'
import Instrument,{ db } from '../../../Models/Instrument'

dbConnect()

const getResults = async (req,res) => {

    const query = req.query.id
    const regex = new RegExp(query, 'i')

    try {
        const Instruments = await Instrument.find({$or:[ {'name': {$regex: regex}}, {'reference': {$regex: regex}}, {'category': {$regex: regex}}, {'subcategory': {$regex: regex}}, {'description': {$regex: regex}} ]}).sort({createdAt: -1}).sort({createdAt: -1}).skip(req.query.page*10).limit(10)
    
        if(!Instruments) res.status(400).json({ success: false })

    res.status(200).json({ success: true, data: Instruments })

    } catch (error) {
        res.status(400).json({ success: false });
    }
}

export default getResults