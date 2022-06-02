import dbConnect from "../../../utils/dbConnect";
import Brimstone from "../../../Models/Brimstone";
// currently not in use
dbConnect();
export default  async (req, res) => {
  if (req.method !== 'GET') return res.status(400).json({success : false , message :'Only GET request accepted'})
  try {
    const userData = await Brimstone.findOne({email : req.email})
  
    res.status(200).json({ success: true, data: userData });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}



