import dbConnect from "../../../utils/dbConnect";
import Docteur from "../../../Models/Docteur";

dbConnect();
export default  async (req, res) => {
  if (req.method !== 'POST') return res.status(400).json({success : false , message :'Only POST request accepted'})
  try {
    const userData = await Docteur.findOneAndUpdate({email : req.body.email},
        {address: req.body.address},
        { new: true, runValidators: true })
  
    res.status(200).json({ success: true, data: userData });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}



