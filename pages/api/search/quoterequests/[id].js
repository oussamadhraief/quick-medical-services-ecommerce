import dbConnect from '../../../../utils/dbConnect'
import Quote from '../../../../Models/Quote'

dbConnect()

const getResults = async (req,res) => {

    const query = req.query.id
    const regex = new RegExp(query, 'i')

    try {
      
        const AnotherQuotes = await Quote.find().populate('user cart.product')
        const Quotes = AnotherQuotes.filter(item => regex.test(item.name) || regex.test(item.note) || regex.test(item.email) || regex.test(item.phoneNumber) || regex.test(item.user.name) ||  regex.test(item.user.email) || regex.test(item.user.phoneNumber) || regex.test(item._id) )
        
        if(!Quotes) res.status(400).json({ success: false })

        const Orders = Quotes.slice(req.query.page * 5,req.query.page * 5 +5)

        res.status(200).json({ success: true, data: Orders })

    } catch (error) {

        res.status(400).json({ success: false })

    }
}

export default getResults