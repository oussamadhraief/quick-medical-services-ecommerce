import dbConnect from "../../../utils/dbConnect"
import Commande from "../../../models/Commande"

dbConnect();

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            try {
                const commande = await Commande.find({});
                res.status(200).json({ success: true, data: commande });
            } catch {
                res.status(400).json({ success: false });
            }
            break;
        case "POST":
            try {
                const commande = await Commande.create(req.body);
                res.status(201).json({ success: true, data: commande });
                
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        
    }
};
