const mongoose = require('mongoose');
const AdminDataSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    }
})

module.exports = mongoose.models.AdminData || mongoose.model('AdminData', AdminDataSchema)