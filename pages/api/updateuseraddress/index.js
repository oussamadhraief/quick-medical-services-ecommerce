import dbConnect from '../../../utils/dbConnect'
import Bambi from '../../../Models/Bambi'
import { getSession } from 'next-auth/react'
// user must be logged in
dbConnect()
export default async (req, res) => {
  const session = await getSession({ req })

  if (req.method !== 'PATCH') return res.status(400).json({ success: false, message: 'Only PATCH request accepted' })

  if (session) {
    const user = await Bambi.findOne({ email: session.user.email })
    try {
      if(!user){
        res.status(404).json({success: false, message: 'User not found'})
      }

      const address = req.body.address.address
      const city = req.body.address.city
      const country = req.body.address.country
      const zipCode = req.body.address.zipCode

      if(session.user.address.length == 0){
        user.address.push(address)
        user.city.push(city)
        user.country.push(country)
        user.zipCode.push(zipCode)
      }else{
        if(req.body.addressType == 'second' ){
          if(session.user.address.length == 1){
            user.address.push(address)
            user.city.push(city)
            user.country.push(country)
            user.zipCode.push(zipCode)
          }else{
            user.address[1] = address
            user.city[1] = city
            user.country[1] = country
            user.zipCode[1] = zipCode
          }
        }else{
          user.address[0] = address
            user.city[0] = city
            user.country[0] = country
            user.zipCode[0] = zipCode
        }

      }
      user.save()
      res.status(200).json({ success: true })
    } catch (error) {
      res.status(400).json({ success: false })
    }
  } else
    res.status(401).json({ sucess: false, message: 'must be authenticated' })
}
