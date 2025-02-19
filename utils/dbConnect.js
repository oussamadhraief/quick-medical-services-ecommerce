const mongoose = require('mongoose');
require('dotenv').config()

const connection = {};

async function dbConnect() {

    if (connection.isConnected) {
        return;
    }
    
    const db = await mongoose.connect(process.env.MONGO_URI , {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        autoIndex: true,
    });

    connection.isConnected = db.connections[0].readyState;

}

export default dbConnect;
