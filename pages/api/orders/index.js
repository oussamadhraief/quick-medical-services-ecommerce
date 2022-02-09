import dbConnect from "../../../utils/dbConnect";
import Order, { db } from "../../../models/Order";

dbConnect();

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            try {
                const order = await Order.find({});
                res.status(200).json({ success: true, data: order });
            } catch {
                res.status(400).json({ success: false });
            }
            break;
        case "POST":
            try {
                const order = await db.collection("orders").insertOne(req.body);
                res.status(201).json({ success: true, data: order });
                
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        
    }
};
