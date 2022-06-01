import dbConnect from '../../../../utils/dbConnect'
import Contact from '../../../../Models/Contact'

dbConnect()

const getResults = async (req,res) => {

    const query = req.query.id
    const regex = new RegExp(query, 'i')

    try {
        const Contacts = await Contact.find({$or:[ {'name': {$regex: regex}}, {'email': {$regex: regex}}, {'phoneNumber': {$regex: regex}}, {'subject': {$regex: regex}}, {'message': {$regex: regex}} ]}).sort({createdAt: -1}).sort({createdAt: -1}).skip(req.query.page*10).limit(10)
    
        if(!Contacts) res.status(400).json({ success: false })

    res.status(200).json({ success: true, data: Contacts })

    } catch (error) {
        res.status(400).json({ success: false });
    }
}

export default getResults