import dbConnect from "../../../utils/dbConnect";
import AdminData from '../../../Models/AdminData'

dbConnect()

const getAdminData =  async (req,res) => {
            try {
                const data = await AdminData.find({})
                
                if(req.body == "qmsmta3eldeeznutsbelha9dimanlwa7ed") res.status(200).json({success:true, data: data})
                res.status(400).json({success:false})
            } catch (error) {
                res.status(400).json({success:false})
            }
}

export default getAdminData