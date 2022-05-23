import dbConnect from "../../../utils/dbConnect";
import Amazon from "../../../Models/Amazon";

dbConnect();
const handleSingleOrder = async (req, res) => {
    const {
        query: { id },
        method,
    } = req;
    if (method === "PUT") {
        try {
            const archivedAmazon = await Amazon.findByIdAndUpdate(
                id,
                { archived: true },
                { new: true, runValidators: true }
            );
            if (!archivedAmazon) {
                return res.status(400).json({ success: false });
            }
            return res.status(200).json({ success: true, data: archivedAmazon });
        } catch (error) {
            return res.status(400).json({ success: false });
        }
    }
};

export default handleSingleOrder
