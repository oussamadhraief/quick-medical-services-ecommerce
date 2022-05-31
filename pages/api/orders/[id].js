import dbConnect from "../../../utils/dbConnect"
import Amazon from "../../../Models/Amazon"
import { getSession } from "next-auth/react"

dbConnect();

export default async (req, res) => {
    const session = await getSession({ req })
    const id = req.query.id
 
    switch(req.method){
        case 'PUT':
        try {
            if(session){
                if(session.user.isAdmin){
                    
                        
                        const Orders = await Amazon.findOneAndUpdate({_id: id},{status: 'Livrée'},{ new: true, runValidators: true })
                    if(!Orders)        
                    {
                        res.status(400).json({ success: false });
                                return
                            }         
                            
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
                break;
                case 'DELETE':
                    try {
                        if(session){
                            if(session.user.isAdmin){
                                
                            
                            const Orders = await Amazon.findOneAndUpdate({_id: id},{status: 'Archivée'},{ new: true, runValidators: true })
                            
                            if(!Orders)        
                            {
                                res.status(400).json({ success: false });
                                    return
                                }         
                            
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
    
}
