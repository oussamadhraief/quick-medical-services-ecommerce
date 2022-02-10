import dbConnect from "../../../utils/dbConnect";
import Produit from "../../../models/Produit";

dbConnect();

export default async (req, res) => {
    switch (req.method) {
        case 'GET':
            try {
                const Produits = await Produit.find({}).sort({createdAt: 1});

                res.status(200).json({ success: true, data: Produits });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {

                const data = await Produit.create(req.body)

                res.status(201).json({ success: true, data: data });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;
        case 'PUT':
            try {
                const Produit = await Produit.findOneAndUpdate(
                    { reference: req.body.reference },
                    req.body,
                    { new: true }
                );
                res.status(200).json({ success: true, data: Produit });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'DELETE':
            try {
                const deletedProduit = await Produit.deleteOne({
                    reference: req.body.reference,
                });
                if (!deletedProduit) {
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


export const config = {
    api: {
      bodyParser: {
        sizeLimit: '7mb',
      },
    },
  }