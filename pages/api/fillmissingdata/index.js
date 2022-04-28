import dbConnect from "../../../utils/dbConnect";
import Docteur from "../../../Models/Docteur";

dbConnect();
export default  async (req, res) => {
  if (req.method !== 'POST') return res.status(400).json({success : false , message :'Only POST request accepted'})
  try {
    let dataToUpdate = {}
    if(req.body.phone != '') dataToUpdate.phone = req.body.phone
    if(req.body.address != '') dataToUpdate.address = req.body.address
    const userData = await Docteur.findOneAndUpdate({email : req.body.email},
        dataToUpdate,
        { new: true, runValidators: true })
  
    res.status(200).json({ success: true, data: userData });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}



