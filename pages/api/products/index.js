import dbConnect from "../../../utils/dbConnect";
import Product, { db } from "../../../models/Product";

dbConnect();

export default async (req, res) => {
    switch (req.method) {
        case 'GET':
            try {
                const products = await Product.find({});

                res.status(200).json({ success: true, data: products });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                
                const data = await db.collection("products").insertOne(req.body)

                res.status(201).json({ success: true, data: data })

            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
