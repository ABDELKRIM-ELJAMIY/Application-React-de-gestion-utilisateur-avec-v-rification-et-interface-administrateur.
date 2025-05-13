const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send('User Management App Backend is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});