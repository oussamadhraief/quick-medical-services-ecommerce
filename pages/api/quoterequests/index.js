import dbConnect from "../../../utils/dbConnect"
import Estimate from "../../../Models/Estimate"
import { getSession } from "next-auth/react"

dbConnect();

export default async (req, res) => {
    const session = await getSession({ req })

            try {
                if(session){
                    if(session.user.isAdmin){
                        const NumberOfOrders = await Estimate.countDocuments({status: "En cours"})

                        let Orders
                        
                        if(req.query.page > Math.ceil(NumberOfOrders / 20) -1){
                            
                            Orders = await Estimate.find({status: "En cours"}).sort({createdAt: -1}).limit(20).populate('user')
                            
                            res.status(200).json({ success: true, data: Orders, number: NumberOfOrders, index: 0 })
                            
                            return
                            
                        }else{
                            
                            Orders = await Estimate.find({status: "En cours"}).sort({createdAt: -1}).skip(req.query.page* 20).limit( 20).populate('user')

                            res.status(200).json({ success: true, data: Orders, number: NumberOfOrders, index: req.query.page });

                            return
                        }
                    }else{
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
