import dbConnect from '../../../utils/dbConnect'
import Feedback from '../../../Models/Contact'
dbConnect()

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        const data = await Feedback.find({})
        return res.status(200).json({ success: true, data: data })
      } catch (error) {
        return res.status(400).json({ success: false })
      }
    case 'POST':
      try {
        const data = await Feedback.create(req.body)
        return res.status(201).json({ success: true, data: data })
      } catch (error) {
        return res.status(400).json({ success: false })
      }
    case 'PUT':
      try {
        const data = await Feedback.findOneAndUpdate(
          { _id: req.body._id },
          req.body,
          { new: true }
        )
        return res.status(200).json({ success: true, data: data })
      } catch (error) {
        return res.status(400).json({ success: false })
      }
  }
}
