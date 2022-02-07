import dbConnect from "../../../utils/dbConnect";
import Order, { db } from "../../../models/Order";

dbConnect();

export default async (req , res) => {
    if (req.method === "GET"){
            try {
                const order = await Order.find({});
                res.status(200).json({success : true , data : order})
            }
            catch{
                res.status(400).json({success : false})
            }
    }
        
    
}