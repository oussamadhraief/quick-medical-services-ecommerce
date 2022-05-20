import dbConnect from "../../../utils/dbConnect";
import Instrument from "../../../Models/Instrument";
import { getSession } from "next-auth/react"
dbConnect();
//POST PUT and DELETE only for admin

export default async (req, res) => {
    const session = await getSession({ req })

    const {
        query : {page},
        method 
    } = req

    switch (method) {
        case 'GET':
            try {
                const Instruments = await Instrument.find({}).sort({createdAt: -1}).skip(page*10).limit(10)
                const NumberOfInstruments = await Instrument.countDocuments({})
                
                res.status(200).json({ success: true, data: Instruments, number: NumberOfInstruments });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            if(session){
                if(session.user.isAdmin){
                    try {

                        const data = await Instrument.create(req.body)
        
                        res.status(201).json({ success: true, data: data });
                    } catch (error) {
                        res.status(400).json({ success: false, error });
                    }
                }
                else (
                    res.status(401).json({success: false, message: ' Must be authorized'})
                )
            }
            else{
                res.status(401).json({success: false, message: ' Must be authenticated'})
            }
            
            break;
        case 'PUT':
            if(session){
                if(session.user.isAdmin){
                    try {
                        const Instrument = await Instrument.findOneAndUpdate(
                            { reference: req.body.reference },
                            req.body,
                            { new: true }
                        );
                        res.status(200).json({ success: true, data: Instrument });
                    } catch (error) {
                        res.status(400).json({ success: false });
                    }
                }
                else{
                    res.status(401).json({success: false, message: ' Must be authorized'})
                }
            }
            else{
                res.status(401).json({success: false, message: ' Must be authenticated'})
            }
            
            break;
        case 'DELETE':
            if(session){
                if(session.user.isAdmin){
                    try {
                        const deletedInstrument = await Instrument.deleteOne({
                            reference: req.body.reference,
                        });
                        if (!deletedInstrument) {
                            return res.status(400).json({ success: false });
                        }
                        return res.status(200).json({ sucees: true, data: {} });
                    } catch (error) {
                        return res.status(400).json({ success: false });
                    }
                }
                else{
                    res.status(401).json({success: false, message: ' Must be authorized'})
                }
            }
            else{
                res.status(401).json({success: false, message: ' Must be authenticated'})
            }
            
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
