import dbConnect from "../../../utils/dbConnect"
import Quote from "../../../Models/Quote"
import Instrument from "../../../Models/Instrument"
import { getSession } from "next-auth/react"

dbConnect();

export default async (req, res) => {
    const session = await getSession({ req })

            try {
                if(session){
                    if(session.user.isAdmin){
                        
                        const number = req.query.page*5
                            const quoterequests = await Quote.find({status: {$ne: "En cours"}}).sort({createdAt: -1}).skip(number).limit(5).populate('user')
                            
                            for(let element of quoterequests){
                                for(let item of element.cart){
                                    item.product = await Instrument.findOne({_id: item.product})
                                }
                            }

                            res.status(200).json({ success: true, data: quoterequests })

                            return
                        }
                    else{
                        res.status(401).json({success: false , message: 'Must be authorized'})
                        
                        return
                    }
                }
                else{
                    res.status(401).json({success: false , message: 'Must be authenticated'})
                    
                    return
                }
                
            } catch(error) {
                res.status(400).json({ success: false });
            }  
    
}
