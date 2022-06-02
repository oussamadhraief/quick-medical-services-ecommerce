import dbConnect from "../../../utils/dbConnect";
import Instrument from "../../../Models/Instrument";

dbConnect()

export default async (req,res) => {
    try {

        const fields = { _id: 0, category: 1, subcategory: 1 }
        const categoriesandsubcategories = await Instrument.find({archived: false}).select(fields);

        let categories = categoriesandsubcategories.map(item => item.category)
        categories = [...new Set(categories)]
        const orderedStuff = categories.map(item => {return {
            category: item,
            subcategories: [...new Set(categoriesandsubcategories.filter(element => element.category == item).map(elem => elem.subcategory))]
        }})
        
        res.status(200).json({ success: true, data: orderedStuff });

    } catch (error) {

        res.status(400).json({ success: false })

    }
}