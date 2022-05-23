import dbConnect from "../../../utils/dbConnect";
import Instrument from "../../../Models/Instrument";
import { getSession } from "next-auth/react"
dbConnect();
//POST PUT and DELETE only for admin

export default async (req, res) => {

            try {
                const NumberOfInstruments = await Instrument.countDocuments({archived: true})

                let Instruments

                if(req.query.page > Math.ceil(NumberOfInstruments /10) -1){

                    Instruments = await Instrument.find({archived: true}).sort({createdAt: -1}).limit(10)

                    res.status(200).json({ success: true, data: Instruments, number: NumberOfInstruments, index: 0 });

                }else{

                    Instruments = await Instrument.find({archived: true}).sort({createdAt: -1}).skip(req.query.page*10).limit(10)

                    res.status(200).json({ success: true, data: Instruments, number: NumberOfInstruments, index: req.query.page });
                }
                
            } catch (error) {

                res.status(400).json({ success: false });
                
            }

}
