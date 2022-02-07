import dbConnect from "../../../utils/dbConnect";
import Product, { db } from "../../../models/Product";

dbConnect();

export default async (req, res) => {
    const {
        query: { id },
        method,
    } = req;

    switch (method) {
        case "GET":
            try {
                const product = await Product.findOne({ reference: id });
                if (!product) {
                    return res.status(400).json({ success: false });
                }
                return res.status(400).json({ success: true, data: product });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case "PUT":
            try {
                const modifiedProduct = await Product.findOneAndUpdate(
                    { reference: id },
                    req.body,
                    { new: true, runValidators: true }
                );

                if (!modifiedProduct) {
                    return res
                        .status(400)
                        .json({ success: false, data: modifiedProduct });
                }
                return res
                    .status(200)
                    .json({ succes: true, data: modifiedProduct });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case "DELETE":
            try {
                const deletedProduct = await Product.deleteOne({
                    reference: id,
                });
                if (!deletedProduct) {
                    return res.status(400).json({ success: false });
                }
                return res.status(200).json({ sucees: true, data: {} });
            } catch (error) {
                return res.status(400).json({ success: false });
            }
            break;
    }
};
