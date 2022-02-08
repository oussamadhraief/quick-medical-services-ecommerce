import dbConnect from "../../../utils/dbConnect";
import Order, { db } from "../../../models/Order";

dbConnect();
export default async (req, res) => {
    const {
        query: { id },
        method,
    } = req;
    if (method === "PUT") {
        try {
            const archivedOrder = await Order.findByIdAndUpdate(
                id,
                { archived: true },
                { new: true, runValidators: true }
            );
            if (!archivedOrder) {
                return res.status(400).json({ success: false });
            }
            return res.status(200).json({ success: true, data: archivedOrder });
        } catch (error) {
            return res.status(400).json({ success: false });
        }
    }
};
