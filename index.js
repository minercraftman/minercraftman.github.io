const express = require('express');
const multer = require('multer');
const mysql = require('mysql2');
const { check, validationResult } = require('express-validator');

const app = express();
const upload = multer()
const port = 80;
const connection = mysql.createConnection({
    host: "student-databases.cvode4s4cwrc.us-west-2.rds.amazonaws.com",
    user: "DREWPEPPLEY",
    password: "Plo8mBRAwMjlsjnygkO6WjHA7gtEiK031w5",
    database: 'DREWPEPPLEY'
});
const cors = require('cors');
app.use(cors());

app.use(express.static('public')); // Assuming your HTML and index.js are in the 'public' folder

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname + '/public' });
});

app.get('/getdata', (req, res) => { // **Error Happening Here. Need Access To Table To See Values** <---------
    const query = 'SELECT id, location, rating, time FROM tour_log_items';

    connection.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});