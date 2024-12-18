const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (CSS, JS)
app.use(express.static(path.join(__dirname)));

// Route to fetch book recommendations based on genre or author
app.get('/api/books', async (req, res) => {
  try {
    const genre = req.query.genre || 'fiction'; // Default to 'fiction' if no genre provided
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:${genre}`);
    res.json(response.data.items);  // Send back the book data
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching books');
  }
});

// Route to serve the homepage (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
