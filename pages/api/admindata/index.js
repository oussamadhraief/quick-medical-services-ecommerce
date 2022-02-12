import dbConnect from "../../../utils/dbConnect";
import AdminData from '../../../Models/AdminData'

dbConnect()

const getAdminData =  async (req,res) => {
            try {
                const data = await AdminData.find({})
                
                res.status(200).json({success:true, data: data})
            } catch (error) {
                res.status(400).json({success:false})
            }
}

export default getAdminData