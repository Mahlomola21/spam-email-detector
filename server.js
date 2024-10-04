const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Serve static files for the home page and spam detector
app.use(express.static(path.join(__dirname)));

// Route to serve the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));  // Serve home page
});

// Route for the email classification page (Spam Detector)
app.get('/spam-detector', (req, res) => {
    res.sendFile(path.join(__dirname, 'spam_detector', 'index.html'));  // Serve spam detector page
});

// API route for checking email spam
app.post('/check-email', async (req, res) => {
    const { emailText } = req.body;

    try {
        const response = await axios.post('http://localhost:5000/predict', {
            emailText: emailText
        });
        const prediction = response.data.result;
        res.json({ result: prediction });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get prediction' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
