const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dbConfig = fs.readFileSync('./config/database.json');
const db = JSON.parse(dbConfig);
const mysql = require('mysql');

const dbConnection = mysql.createConnection({
    host: db.host,
    user: db.user,
    password: db.password,
    port: db.port,
    database: db.database
});
dbConnection.connect();

app.get('/customers', (req, res) => {
    dbConnection.query(
        "SELECT * FROM customer",
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});