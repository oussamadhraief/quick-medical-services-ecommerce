import dbConnect from "../../../utils/dbConnect";
import AdminData from '../../../Models/AdminData'

dbConnect()

const getAdminData =  async () => {
            try {
                const data = await AdminData.find({})
                
                return data
            } catch (error) {
                return 'error'
            }
}

export default getAdminData