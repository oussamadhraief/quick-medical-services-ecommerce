import dbConnect from "../../../utils/dbConnect";
import Docteur from "../../../Models/Docteur";
import { getSession } from "next-auth/react"

dbConnect();
export default  async (req, res) => {
  const session = await getSession({ req })
  if (req.method !== 'POST') return res.status(400).json({success : false , message :'Only POST request accepted'})
  if(session){
    try {
      const userData = await Docteur.findOneAndUpdate({email : req.body.email},
          {phone: req.body.phone, address: req.body.address},
          { new: true, runValidators: true })
    
      res.status(200).json({ success: true, data: userData });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
  else{
    res.status(401).json({message: 'Must be authenticated'})
  }
}



