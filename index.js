const express = require("express");
const app = express();

const bookRoute = require('./src/routes/book.route');

app.use(express.json());
app.use('/books', bookRoute);

// PORT listening
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Listening on PORT " + port);
});