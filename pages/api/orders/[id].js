import dbConnect from "../../../utils/dbConnect";
import Commande from "../../../models/Commande";

dbConnect();
const handleSingleOrder = async (req, res) => {
    const {
        query: { id },
        method,
    } = req;
    if (method === "PUT") {
        try {
            const archivedCommande = await Commande.findByIdAndUpdate(
                id,
                { archived: true },
                { new: true, runValidators: true }
            );
            if (!archivedCommande) {
                return res.status(400).json({ success: false });
            }
            return res.status(200).json({ success: true, data: archivedCommande });
        } catch (error) {
            return res.status(400).json({ success: false });
        }
    }
};

export default handleSingleOrder
