import dbConnect from "../../../utils/dbConnect";
import Instrument from "../../../Models/Instrument";

dbConnect();

const handleSingleProduct =  async (req, res) => {
    const {
        query: { id },
        method,
    } = req;

    switch (method) {
        case "GET":
            try {
                const Instrument = await Instrument.findOne({ reference: id });
                if (!Instrument) {
                    return res.status(400).json({ success: false });
                }
                return res.status(400).json({ success: true, data: Instrument });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case "PUT":
            try {
                const modifiedInstrument = await Instrument.findOneAndUpdate(
                    { reference: id },
                    req.body,
                    { new: true, runValidators: true }
                );

                if (!modifiedInstrument) {
                    return res
                        .status(400)
                        .json({ success: false, data: modifiedInstrument });
                }
                return res
                    .status(200)
                    .json({ succes: true, data: modifiedInstrument });
            } catch (error) {
                res.status(400).json({ success: false , error: error });
            }
            break;
        case "DELETE":
            try {
                const deletedInstrument = await Instrument.deleteOne({
                    reference: id,
                });
                if (!deletedInstrument) {
                    return res.status(400).json({ success: false });
                }
                return res.status(200).json({ sucees: true, data: {} });
            } catch (error) {
                return res.status(400).json({ success: false });
            }
            break;
    }
};

export default handleSingleProduct
