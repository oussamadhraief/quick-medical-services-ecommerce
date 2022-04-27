import dbConnect from "../../../utils/dbConnect";
import User, { db } from "../../../Models/User"
dbConnect()

async function handler(req, res) {
  if(req.method !== 'POST'){
    return;
  }
  try {
    const user = await db.collection('users').findOne({email: req.body.email})
    if(!user){
      res.status(400).json({ success: false});
    }
    
    res.status(200).json({ success: true, data: user });
} catch (error) {
    res.status(400).json({ success: false });
}
  
}
export default handler