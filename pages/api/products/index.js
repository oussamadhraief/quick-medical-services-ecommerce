import dbConnect from "../../../utils/dbConnect";
import Instrument from "../../../Models/Instrument";
import { getSession } from "next-auth/react"
dbConnect();
//POST PUT and DELETE only for admin

export default async (req, res) => {
    const session = await getSession({ req })
    switch (req.method) {
        case 'GET':
            try {
                const Instruments = await Instrument.find({}).sort({createdAt: -1}).select({_id: 0, name: 1, description:1, category: 1, subcategory: 1, sizes: 1,reference: 1, image: 1,createdAt: 1,availability:1});

                res.status(200).json({ success: true, data: Instruments });
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
