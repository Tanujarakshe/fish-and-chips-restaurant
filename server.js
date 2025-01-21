const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/fish-and-chips-restaurant', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Failed to connect to MongoDB:', err));

// Mongoose models
const User = mongoose.model('User', new mongoose.Schema({
    username: String,
    password: String,
    email: String,
}));

const Review = mongoose.model('Review', new mongoose.Schema({
    name: String,
    rating: Number,
    comment: String,
}));

// Routes
app.post('/register', (req, res) => {
    const { username, password, email } = req.body;

    const newUser = new User({ username, password, email });
    newUser.save()
        .then(() => res.status(201).send('Registration successful!'))
        .catch((err) => res.status(400).send('Error registering user: ' + err));
});

app.get('/reviews', (req, res) => {
    const reviews = [
        { name: 'John Doe', rating: 5, comment: 'Best fish and chips in town!' },
        { name: 'Jane Smith', rating: 4, comment: 'Great food, fast service!' },
        { name: 'Bob Brown', rating: 5, comment: 'Absolutely loved the classic fish and chips!' }
    ];

    res.json(reviews);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
