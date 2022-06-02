import dbConnect from '../../../utils/dbConnect'
import Instrument from '../../../Models/Instrument'
import { getSession } from "next-auth/react"


dbConnect()

const getResults = async (req,res) => {
    const session = await getSession({ req })

    const query = req.query.id
    const regex = new RegExp(query, 'i')
    if(session){
        if(session.user.isAdmin){
            try {
                const NumberOfInstruments = await Instrument.countDocuments({$or:[ {'name': {$regex: regex}}, {'reference': {$regex: regex}}, {'category': {$regex: regex}}, {'subcategory': {$regex: regex}}, {'description': {$regex: regex}} ]}).sort({createdAt: -1}).sort({createdAt: -1})

                let Instruments

                if(req.query.page > Math.ceil(NumberOfInstruments /10) -1){

                    const Instruments = await Instrument.find({$or:[ {'name': {$regex: regex}}, {'reference': {$regex: regex}}, {'category': {$regex: regex}}, {'subcategory': {$regex: regex}}, {'description': {$regex: regex}} ]}).sort({createdAt: -1}).sort({createdAt: -1}).limit(10)

                    res.status(200).json({ success: true, data: Instruments, number: NumberOfInstruments, index: 0 })

                }else{
                    const Instruments = await Instrument.find({$or:[ {'name': {$regex: regex}}, {'reference': {$regex: regex}}, {'category': {$regex: regex}}, {'subcategory': {$regex: regex}}, {'description': {$regex: regex}} ]}).sort({createdAt: -1}).sort({createdAt: -1}).skip(req.query.page*10).limit(10)
                    res.status(200).json({ success: true, data: Instruments, number: NumberOfInstruments, index: req.query.page });
                }
            } catch (error) {
                res.status(400).json({ success: false });
            }
        }else {
                res.status(401).json({success: false, message: ' Must be authorized'})
            
                return
        }
        }else{
            res.status(401).json({success: false, message: ' Must be authenticated'})
        }
}

export default getResults