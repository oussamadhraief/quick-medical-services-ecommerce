import dbConnect from "../../../utils/dbConnect"
import Amazon from "../../../Models/Amazon"
import { getSession } from "next-auth/react"

dbConnect();

export default async (req, res) => {
    const session = await getSession({ req })
            try {
                if(session){
                    if(session.user?.isAdmin){
                
                            const Orders = await Amazon.find({status: "En cours"}).sort({createdAt: -1}).skip(req.query.page* 5).limit( 5).populate('user cart.product')
                            res.status(200).json({ success: true, data: Orders });

                            return
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
