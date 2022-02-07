import dbConnect from "../../../utils/dbConnect";
import Product from "../../../models/Product";

dbConnect();

export default async (req, res) => {
    // switch (method) {
    //     case 'GET':
    //         try {
    //             const products = await Product.find({});

    //             res.status(200).json({ success: true, data: products });
    //         } catch (error) {
    //             res.status(400).json({ success: false });
    //         }
    //         break;
        // case 'POST':
            try {
                
                const data = await Product.create(req.body,function (err, small) {
                    if (err) return handleError(err);
                    // saved!
                  })

                res.status(201).json({ success: true, data: data })

            } catch (error) {
                res.status(400).json({ success: false });
            }
            // break;
    //     default:
    //         res.status(400).json({ success: false });
    //         break;
    // }
};
