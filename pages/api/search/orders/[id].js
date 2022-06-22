import dbConnect from '../../../../utils/dbConnect'
import Amazon from '../../../../Models/Amazon'

dbConnect()

const getResults = async (req,res) => {

    const query = req.query.id
    const regex = new RegExp(query, 'i')

    try {
      
        const AnotherAmazons = await Amazon.find().populate('user')
        const Amazons = AnotherAmazons.filter(item => regex.test(item.name) || regex.test(item.note) || regex.test(item.email) || regex.test(item.phoneNumber) || regex.test(item.clinicName) || regex.test(item.taxRegistrationNumber) ||  regex.test(item.user.name) ||  regex.test(item.user.email) || regex.test(item.user.phoneNumber) || regex.test(item._id) )
        
        if(!Amazons) res.status(400).json({ success: false })

        const Orders = Amazons.slice(req.query.page * 5,req.query.page * 5 +5)

        res.status(200).json({ success: true, data: Orders })

    } catch (error) {

        res.status(400).json({ success: false })

    }
}

export default getResults