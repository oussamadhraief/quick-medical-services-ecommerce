import dbConnect from "../../../utils/dbConnect";
import Jumia from "../../../Models/Jumia";

dbConnect();
const handleSingleOrder = async (req, res) => {
    const {
        query: { id },
        method,
    } = req;
    if (method === "PUT") {
        try {
            const archivedJumia = await Jumia.findByIdAndUpdate(
                id,
                { archived: true },
                { new: true, runValidators: true }
            );
            if (!archivedJumia) {
                return res.status(400).json({ success: false });
            }
            return res.status(200).json({ success: true, data: archivedJumia });
        } catch (error) {
            return res.status(400).json({ success: false });
        }
    }
};

export default handleSingleOrder
