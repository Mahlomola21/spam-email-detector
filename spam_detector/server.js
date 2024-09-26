const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

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