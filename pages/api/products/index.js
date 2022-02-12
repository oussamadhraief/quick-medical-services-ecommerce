import dbConnect from "../../../utils/dbConnect";
import Instrument from "../../../Models/Instrument";

dbConnect();

const handleProducts = async (req, res) => {
    switch (req.method) {
        case 'GET':
            try {
                const Instruments = await Instrument.find({}).sort({createdAt: 1});

                res.status(200).json({ success: true, data: Instruments });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {

                const data = await Instrument.create(req.body)

                res.status(201).json({ success: true, data: data });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;
        case 'PUT':
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
            break;
        case 'DELETE':
            try {
                const deletedInstrument = await Instrument.deleteOne({
                    reference: req.body.reference,
                });
                if (!deletedInstrument) {
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

export default handleProducts


export const config = {
    api: {
      bodyParser: {
        sizeLimit: '4mb',
      },
    },
  }