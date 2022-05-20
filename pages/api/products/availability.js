import dbConnect from "../../../utils/dbConnect";
import Instrument from "../../../Models/Instrument";
import { getSession } from "next-auth/react"
dbConnect();
//POST PUT and DELETE only for admin

export default async (req, res) => {
    const session = await getSession({ req })

    const {
        query : {page}
    } = req

            try {
                const Instruments = await Instrument.find({availability: req.body.availability}).sort({createdAt: -1}).skip(page*10).limit(10)
                const NumberOfInstruments = await Instrument.countDocuments({availability: req.body.availability})
                
                res.status(200).json({ success: true, data: Instruments, number: NumberOfInstruments, availability: req.body.availability});
            } catch (error) {
                res.status(400).json({ success: false });
            }
}
