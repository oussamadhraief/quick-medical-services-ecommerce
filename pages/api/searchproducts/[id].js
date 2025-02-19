import dbConnect from "../../../utils/dbConnect"
import Instrument from "../../../Models/Instrument"
dbConnect();

export default async (req, res) => {

const query = req.query.id
const regex = new RegExp(query, 'i')
const {sort,filter} = req.query
            try {
                let NumberOfInstruments
                let sortparameter
                
                switch (sort) {
                    case 'recent':
                        sortparameter = -1
                        break;
                        case 'oldest':
                            sortparameter = 1
                            break;
                            
                            default:
                                sortparameter = 1
                                break;
                            }
                            
            switch (filter) {
                    case 'all':
                         NumberOfInstruments = await Instrument.countDocuments({$or:[ {'name': {$regex: regex}}, {'reference': {$regex: regex}}, {'category': {$regex: regex}}, {'subcategory': {$regex: regex}}, {'description': {$regex: regex}} ], archived: false})
                        if(req.query.page > Math.ceil(NumberOfInstruments /10) -1){
                            const Instruments = await Instrument.find({$or:[ {'name': {$regex: regex}}, {'reference': {$regex: regex}}, {'category': {$regex: regex}}, {'subcategory': {$regex: regex}}, {'description': {$regex: regex}} ], archived: false}).sort({createdAt: sortparameter}).limit(10)
                            
                            res.status(200).json({ success: true, data: Instruments, number: NumberOfInstruments, index: 0 });
                        }else{
                            const Instruments = await Instrument.find({$or:[ {'name': {$regex: regex}}, {'reference': {$regex: regex}}, {'category': {$regex: regex}}, {'subcategory': {$regex: regex}}, {'description': {$regex: regex}} ],archived: false}).sort({createdAt: sortparameter}).skip(req.query.page*10).limit(10)
                            res.status(200).json({ success: true, data: Instruments, number: NumberOfInstruments, index: req.query.page });
                        }
                        break;
                        case 'unavailable':
                            NumberOfInstruments = await Instrument.countDocuments({$or:[ {'name': {$regex: regex}}, {'reference': {$regex: regex}}, {'category': {$regex: regex}}, {'subcategory': {$regex: regex}}, {'description': {$regex: regex}} ],archived: false,availability: 'unavailable'})
                            if(req.query.page > Math.ceil(NumberOfInstruments /10) -1){
                                const Instruments = await Instrument.find({$or:[ {'name': {$regex: regex}}, {'reference': {$regex: regex}}, {'category': {$regex: regex}}, {'subcategory': {$regex: regex}}, {'description': {$regex: regex}} ],archived: false, availability: 'unavailable'}).sort({createdAt: sortparameter}).limit(10)
                                res.status(200).json({ success: true, data: Instruments, number: NumberOfInstruments, index: 0 });
                            }else{
                                const Instruments = await Instrument.find({$or:[ {'name': {$regex: regex}}, {'reference': {$regex: regex}}, {'category': {$regex: regex}}, {'subcategory': {$regex: regex}}, {'description': {$regex: regex}} ],archived: false, availability: 'unavailable'}).sort({createdAt: sortparameter}).skip(req.query.page*10).limit(10)
                                res.status(200).json({ success: true, data: Instruments, number: NumberOfInstruments, index: req.query.page });
                            }
                            break;
                            
                            default:
                            NumberOfInstruments = await Instrument.countDocuments({$or:[ {'name': {$regex: regex}}, {'reference': {$regex: regex}}, {'category': {$regex: regex}}, {'subcategory': {$regex: regex}}, {'description': {$regex: regex}} ],archived: false, availability: 'available'})
                        
                            if(req.query.page > Math.ceil(NumberOfInstruments /10) -1){
                            const Instruments = await Instrument.find({$or:[ {'name': {$regex: regex}}, {'reference': {$regex: regex}}, {'category': {$regex: regex}}, {'subcategory': {$regex: regex}}, {'description': {$regex: regex}} ],archived: false ,availability: 'available'}).sort({createdAt: sortparameter}).limit(10)
                            res.status(200).json({ success: true, data: Instruments, number: NumberOfInstruments, index: 0 });
                        }else{
                            const Instruments = await Instrument.find({$or:[ {'name': {$regex: regex}}, {'reference': {$regex: regex}}, {'category': {$regex: regex}}, {'subcategory': {$regex: regex}}, {'description': {$regex: regex}} ],archived: false, availability: 'available'}).sort({createdAt: sortparameter}).skip(req.query.page*10).limit(10)
                            res.status(200).json({ success: true, data: Instruments, number: NumberOfInstruments, index: req.query.page });
                        }
                        break;
                }

                
                
            } catch (error) {
                res.status(400).json({ success: false });
            }

}






