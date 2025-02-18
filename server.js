const express = require('express');
const fs = require('fs');
const axios = require('axios');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up Multer for file uploads
const upload = multer({ dest: 'uploads/' });

// GitHub repo details
const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_REPO = 'rose.events';
const GITHUB_PATH = 'Review'; // Folder where reviews will be stored
const GITHUB_BRANCH = 'main'; // Default branch
const GITHUB_TOKEN = 'YOUR_GITHUB_TOKEN'; // Replace with your GitHub token

// API endpoint to handle review submission
app.post('/submit-review', upload.single('image'), async (req, res) => {
    const { name, text, color } = req.body;
    const image = req.file;

    // Create review content
    const reviewContent = `
    <div style="background-color: ${color};">
        <h3>${name}</h3>
        <p>${text}</p>
        ${image ? `<img src="data:image/png;base64,${fs.readFileSync(image.path, 'base64')}" />` : ''}
    </div>
    `;

    try {
        // Prepare GitHub API request to save the review in the repo
        const filePath = `rose.events/Review/${Date.now()}.html`; // Save each review as a new HTML file
        const content = Buffer.from(reviewContent).toString('base64');

        const response = await axios.put(
            `${GITHUB_API_URL}/repos/${GITHUB_REPO}/contents/${filePath}`,
            {
                message: 'Add new review',
                content: content,
                branch: GITHUB_BRANCH,
            },
            {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`,
                },
            }
        );

        // Respond with success
        res.json({ message: 'Review submitted successfully', data: response.data });
    } catch (error) {
        console.error('Error submitting review:', error);
        res.status(500).json({ error: 'Error submitting review' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
