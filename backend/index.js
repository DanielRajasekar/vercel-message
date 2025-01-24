const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const cors = require('cors');
const Message = require('./models/Mess');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8888;

// Connect to the database
connectDB();

// CORS Configuration
const corsOptions = {
    origin: [process.env.APPLICATION_URL, 'http://localhost:3000', 'https://frontend-three-nu.vercel.app'], // Include the frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};


app.use(cors(corsOptions));
app.use(express.json()); // JSON body parsing

// Routes
app.get('/api/messages', async (req, res, next) => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages); // Send 200 status code with the messages
    } catch (err) {
        console.error(err);
        next(err); // Pass the error to the error-handling middleware
    }
});

app.post('/api/messages', async (req, res, next) => {
    const { Name, Title, Message: messageContent } = req.body;

    // Basic input validation
    if (!Name || !Title || !messageContent) {
        return res.status(400).json({ message: 'Name, Title, and Message are required' });
    }

    try {
        const newMessage = new Message({
            Name,
            Title,
            Message: messageContent
        });
        const message = await newMessage.save();
        res.status(201).json(message); // Send 201 status code for created resource
    } catch (err) {
        console.error(err);
        next(err); // Pass the error to the error-handling middleware
    }
});

// Error-Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
