import dbConnect from "../../../utils/dbConnect"
import Commande from "../../../Models/Commande"
import { getSession } from "next-auth/react"

dbConnect();

export default async (req, res) => {
    const session = await getSession({ req })
    switch (req.method) {
        case "GET":
            try {
                if(session){
                    if(session.user.isAdmin){
                        const commande = await Commande.find({});
                        res.status(200).json({ success: true, data: commande });
                    }
                    else{
                        console.log('Must be authorized')
                        res.status(401).json({success: false , message: 'Must be authorized'})
                    }
                }
                else{
                    console.log('Must be authenticated')
                    res.status(401).json({success: false , message: 'Must be authenticated'})
                }
                
            } catch(error) {
                console.error(error)
                res.status(400).json({ success: false });
            }
            break;
        case "POST":
            try {
                if(session){
                    const commande = await Commande.create(req.body);
                    res.status(201).json({ success: true, data: commande }); 
                }
                else{
                    console.log('Must be authenticated')
                    res.status(401).json({success: false , message: 'Must be authenticated'})
                }
                
            } catch (error) {
                console.error(error)
                res.status(400).json({ success: false });
            }
            break;
        
    }
};
