import dbConnect from "../../../utils/dbConnect"
import Quote from "../../../Models/Quote"
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
                    
                        
                        let Quotes = await Quote.findOne({_id: id})
                        
                            if(!Quotes)        
                            {
                                res.status(400).json({ success: false });
                                        return
                            }         

                            Quotes.status = 'Répondue'
                            Quotes.price= req.body.price
                            Quotes.message = req.body.message
                            
                            await Quotes.save()
                            console.log(Quotes);

                            res.status(200).json({ success: true, data: Quotes });
                            
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
                                
                            
                            const Quotes = await Quote.findOneAndUpdate({_id: id},{status: 'Archivée'},{ new: true, runValidators: true })
                            
                            if(!Quotes)        
                            {
                                res.status(400).json({ success: false });
                                    return
                                }         
                            
                            res.status(200).json({ success: true, data: Quotes });
    
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
