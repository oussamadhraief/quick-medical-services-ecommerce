import dbConnect from "../../../utils/dbConnect";
import Instrument from "../../../Models/Instrument";

dbConnect()

export default async (req,res) => {
    try {

        const fields = { _id: 0, category: 1, subcategory: 1 }
        const categoriesandsubcategories = await Instrument.find({}).select(fields);

        res.status(200).json({ success: true, data: categoriesandsubcategories });

    } catch (error) {

        res.status(400).json({ success: false })

    }
}