const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const Review = require('./models/review'); // Your review model

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(bodyParser.json());
app.use(express.static('uploads')); // Serve uploaded images

mongoose.connect('mongodb://localhost:27017/reviewsDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Endpoint to add a review
app.post('/submit-review', upload.single('image'), async (req, res) => {
    const { name, text, color } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newReview = new Review({
        name,
        text,
        color,
        imageUrl,
    });

    await newReview.save();
    res.status(200).json(newReview);
});

// Endpoint to get all reviews
app.get('/reviews', async (req, res) => {
    const reviews = await Review.find();
    res.json(reviews);
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});


const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    name: String,
    text: String,
    color: String,
    imageUrl: String,
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
