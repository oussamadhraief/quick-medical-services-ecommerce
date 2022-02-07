import dbConnect from "../../../utils/dbConnect";
import Product, { db } from "../../../models/Product";

dbConnect();

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            try {
                const products = await Product.find({});

                res.status(200).json({ success: true, data: products });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case "POST":
            try {
                const data = await db
                    .collection("products")
                    .insertOne(req.body);

                res.status(201).json({ success: true, data: data });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case "PUT":
            try {
                const product = await Product.findOneAndUpdate(
                    { reference: req.body.reference },
                    req.body,
                    { new: true }
                );
                res.status(200).json({ success: true, data: product });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case "DELETE":
            try {
                const deletedProduct = await Product.deleteOne({
                    reference: req.body.reference,
                });
                if (!deletedProduct) {
                    return res.status(400).json({ success: false });
                }
                return res.status(200).json({ sucees: true, data: {} });
            } catch (error) {
                return res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
};
