const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, 
        { useNewUrlParser: true, 
        useUnifiedTopology: true 
    });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error("Error connecting to the database: " + err);
        process.exit(1);
    }
};
module.exports = connectDB;