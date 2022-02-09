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
                if(((typeof(req.body.name) != "string" || req.body.name.length < 2) || req.body.name == null) || (req.body.name.charAt(0) == ' ' || req.body.name.charAt(req.body.name.length-1) == '')){
                    res.status(400).json({ success: false, error: "Insérez un nom valide" })
                }
                if(((typeof(req.body.category) != "string" || req.body.category.length < 4) || req.body.category == null) || (req.body.category.charAt(0) == ' ' || req.body.category.charAt(req.body.category.length-1) == '')){
                    res.status(400).json({ success: false, error: "Insérez une catégorie valide" })
                }
                if(((typeof(req.body.subcategory) != "string" || req.body.subcategory.length < 4) || req.body.subcategory == null) || (req.body.subcategory.charAt(0) == ' ' || req.body.subcategory.charAt(req.body.subcategory.length-1) == '')){
                    res.status(400).json({ success: false, error: "Insérez une sous-catégorie valide" })
                }
                if(((typeof(req.body.availability) != "string" || req.body.availability.length < 9) || req.body.availability == null)){
                    res.status(400).json({ success: false, error: "Insérez une disponibilité valide" })
                }
                if(((typeof(req.body.reference) != "string" || req.body.reference.length < 5) || req.body.reference == null)){
                    res.status(400).json({ success: false, error: "Insérez une référence valide" })
                }
                if(typeof(req.body.image) != "string" || req.body.image == null){
                    res.status(400).json({ success: false, error: "Insérez une image valide" })
                }
                if((Array.isArray(req.body.sizes) == false || req.body.image == null) || req.body.sizes.length == 0){
                    res.status(400).json({ success: false, error: "Insérez une ou des taille(s) valide(s)" })
                }

                const data = await db.collection("products").insertOne(req.body)

                res.status(201).json({ success: true, data: data });
            } catch (error) {
                res.status(400).json({ success: false, error: "Erreur" });
            }
            break;
        case 'PUT':
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
        case 'DELETE':
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
