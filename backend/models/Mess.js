const mongoose = require('mongoose');

// Define the schema for messages
const userSchema = new mongoose.Schema({
    Name: { type: String, required: true }, // Name is required
    Title: { type: String, required: true }, // Title is required
    Message: { type: String, required: true } // Message is required
});

// Export the model with the correct name
module.exports = mongoose.model('Mess', userSchema);
