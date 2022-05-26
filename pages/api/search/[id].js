import dbConnect from '../../../utils/dbConnect'
import Instrument,{ db } from '../../../Models/Instrument'

dbConnect()

const getResults = async (req,res) => {

    const query = req.query.id
    const regex = new RegExp(query, 'i')

    try {
        const NumberOfInstruments = await Instrument.countDocuments({$or:[ {'name': {$regex: regex}}, {'reference': {$regex: regex}}, {'category': {$regex: regex}}, {'subcategory': {$regex: regex}}, {'description': {$regex: regex}} ]})
        let Instruments
        let index
        if(req.query.page > Math.ceil(NumberOfInstruments /10) -1){

        Instruments = await Instrument.find({$or:[ {'name': {$regex: regex}}, {'reference': {$regex: regex}}, {'category': {$regex: regex}}, {'subcategory': {$regex: regex}}, {'description': {$regex: regex}} ]}).sort({createdAt: -1}).limit(10)
        
        index= 0
    }else{
        Instruments = await Instrument.find({$or:[ {'name': {$regex: regex}}, {'reference': {$regex: regex}}, {'category': {$regex: regex}}, {'subcategory': {$regex: regex}}, {'description': {$regex: regex}} ]}).sort({createdAt: -1}).sort({createdAt: -1}).skip(req.query.page*10).limit(10)
        
        
        index= req.query.page
    }
    
    if(!Instruments) res.status(400).json({ success: false })

    res.status(200).json({ success: true, data: Instruments, number: NumberOfInstruments, index: index })
    } catch (error) {
        res.status(400).json({ success: false });
    }
}

export default getResults