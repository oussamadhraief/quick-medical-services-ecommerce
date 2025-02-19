import dbConnect from "../../../utils/dbConnect";
import Instrument from "../../../Models/Instrument";
import { getSession } from "next-auth/react"
dbConnect();

export default async (req, res) => {
    const session = await getSession({ req })

    switch (req.method) {
        case 'GET':
            try {
                const NumberOfInstruments = await Instrument.countDocuments({archived: false})
                let Instruments
                if(req.query.page > Math.ceil(NumberOfInstruments /10) -1){
                    Instruments = await Instrument.find({archived: false}).sort({createdAt: -1}).limit(10)
                    res.status(200).json({ success: true, data: Instruments, number: NumberOfInstruments, index: 0 });
                }else{
                    Instruments = await Instrument.find({archived: false}).sort({createdAt: -1}).skip(req.query.page*10).limit(10)
                    res.status(200).json({ success: true, data: Instruments, number: NumberOfInstruments, index: req.query.page });
                }
                
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            if(session){
                if(session.user.isAdmin){
                    try {
                            let reference
                            const productsExist = await Instrument.countDocuments({})
                            if(productsExist > 0){
                                const categoryExists = await Instrument.findOne({category: req.body.category}).select({_id: 0, reference:1,subcategory: 1})
                                if(categoryExists){
                                    const subcategoryExists = await Instrument.findOne({subcategory: req.body.subcategory,category: req.body.category}).select({_id: 0, reference:1})
                                    if(subcategoryExists){
                                        const productPosition = await Instrument.find({subcategory: req.body.subcategory,category: req.body.category}).select({_id: 0, reference:1})
                                        const temp = productPosition.map(item => item.reference.split('.'))
                                        const aux =   temp.map(item => item[2])
                                        const productCount =  Math.max(...aux) +1
                                        reference = `${temp[0][0]}.${temp[0][1]}.${productCount}`
                                    }else{
                                        const subcategoryCount = await Instrument.find({category: req.body.category}).select({_id: 0, reference:1})
                                        const temp = subcategoryCount.map(item => item.reference.split('.'))
                                        const aux =   temp.map(item => item[1])
                                        let subcategoryPosition =  Math.max(...aux) +1
                                        reference = `${temp[0][0]}.${subcategoryPosition}.0`
                                    }
                                }else { 
                                    const categoryCount = await Instrument.find({}).select({_id: 0, reference:1})
                                    const temp = categoryCount.map(item => item.reference.split('.'))
                                    const aux =  temp.map(item => item[0])
                                    let categoryPosition =  Math.max(...aux) +1
                                    reference = `${categoryPosition}.0.0`
                                }
                            }else{
                                reference= '0.0.0'
                            }
                           
                            const product = {
                                ...req.body,
                                reference
                            }
                        const data = await Instrument.create(product)
        
                        res.status(201).json({ success: true, data: data });
                    } catch (error) {
                        res.status(400).json({ success: false, error });
                    }
                }
                else {
                    res.status(401).json({success: false, message: ' Must be authorized'})
                
                    return}
            }
            else{
                res.status(401).json({success: false, message: ' Must be authenticated'})
            }
            
            break;
        case 'PUT':
            if(session){
                if(session.user.isAdmin){
                    try {
                        const Instrument = await Instrument.findOneAndUpdate(
                            { reference: req.body.reference },
                            req.body,
                            { new: true }
                        );
                        res.status(200).json({ success: true, data: Instrument });
                    } catch (error) {
                        res.status(400).json({ success: false });
                    }
                }
                else{
                    res.status(401).json({success: false, message: ' Must be authorized'})
                }
            }
            else{
                res.status(401).json({success: false, message: ' Must be authenticated'})
            }
            
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
