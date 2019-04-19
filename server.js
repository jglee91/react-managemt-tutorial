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

const multer = require('multer');
const upload = multer({dest: './upload'});

app.get('/customers', (req, res) => {
    dbConnection.query(
        "SELECT * FROM customer",
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});

app.use('/image', express.static('./upload'));

app.post('/customers', upload.single('image'), (req, res) => {
    let sql = "INSERT INTO customer VALUES (null, ?, ?, ?, ?, ?)";
    let image = "/image/" + req.file.filename;
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    let params = [image, name, birthday, gender, job];
    console.log(params);
    dbConnection.query(sql, params, (err, rows, fields) => {
        console.error(err);
        console.log(rows);
        res.send(rows);
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});