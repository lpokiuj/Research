const express = require('express');
const mongoose = require('mongoose')
const app = express();

mongoose.connect(
    'mongodb://localhost:27017/researchDB'
);
let db = mongoose.connection;

// Check DB connection
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Check DB error
db.on('error', (err) => {
    console.log(err);
});

const bookRoute = require('./src/routes/book.route');

app.use(express.json());
app.use('/books', bookRoute);

// PORT listening
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Listening on PORT " + port);
});