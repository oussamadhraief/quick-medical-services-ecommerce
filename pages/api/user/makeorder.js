import Commande from '../../../Models/Commande'
import Docteur from '../../../Models/Docteur'
import Instrument from '../../../Models/Instrument'
import dbConnect from '../../../utils/dbConnect'
dbConnect()
//change req.body.email to session.email
export default async function handler (req, res) {
  if (req.method !== 'POST') return;

  
  const user = await Docteur.findOne({ email: req.body.email })
  console.log(req.body.products)
  const commande = await Commande.create({user : user , cart : req.body.products, clinicName: req.body.clinicName , taxRegistrationNumber : req.body.taxRegistrationNumber})
  commande.save()
  
  res.status(201).json({success : true , data :commande })
}