import dbConnect from "../../../utils/dbConnect";
import Instrument from "../../../Models/Instrument";
dbConnect();

export default async (req, res) => {
const {sort,filter} = req.query
            try {
                let NumberOfInstruments
                let sortparameter
                let Instruments
                
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
                        
                         NumberOfInstruments = await Instrument.countDocuments({archived: false})
                        if(req.query.page > Math.ceil(NumberOfInstruments /10) -1){
                            Instruments = await Instrument.find({archived: false}).sort({createdAt: sortparameter}).limit(10)
                            res.status(200).json({ success: true, data: Instruments, number: NumberOfInstruments, index: 0 });
                        }else{
                            Instruments = await Instrument.find({archived: false}).sort({createdAt: sortparameter}).skip(req.query.page*10).limit(10)
                            res.status(200).json({ success: true, data: Instruments, number: NumberOfInstruments, index: req.query.page });
                        }
                        break;
                        case 'unavailable':
                            NumberOfInstruments = await Instrument.countDocuments({archived: false,availability: 'unavailable'})
                            if(req.query.page > Math.ceil(NumberOfInstruments /10) -1){
                                Instruments = await Instrument.find({archived: false, availability: 'unavailable'}).sort({createdAt: sortparameter}).limit(10)
                                res.status(200).json({ success: true, data: Instruments, number: NumberOfInstruments, index: 0 });
                            }else{
                                Instruments = await Instrument.find({archived: false, availability: 'unavailable'}).sort({createdAt: sortparameter}).skip(req.query.page*10).limit(10)
                                res.status(200).json({ success: true, data: Instruments, number: NumberOfInstruments, index: req.query.page });
                            }
                            break;
                            
                            default:
                            NumberOfInstruments = await Instrument.countDocuments({archived: false, availability: 'available'})
                        
                            if(req.query.page > Math.ceil(NumberOfInstruments /10) -1){
                            Instruments = await Instrument.find({archived: false ,availability: 'available'}).sort({createdAt: sortparameter}).limit(10)
                            res.status(200).json({ success: true, data: Instruments, number: NumberOfInstruments, index: 0 });
                        }else{
                            Instruments = await Instrument.find({archived: false, availability: 'available'}).sort({createdAt: sortparameter}).skip(req.query.page*10).limit(10)
                            res.status(200).json({ success: true, data: Instruments, number: NumberOfInstruments, index: req.query.page });
                        }
                        break;
                }

                
                
            } catch (error) {
                res.status(400).json({ success: false });
            }

}