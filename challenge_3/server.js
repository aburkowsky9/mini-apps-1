const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const Promise = require('bluebird');
const port = 3000;

app.listen(port, () => console.log(`Listening on http://localhost:${port}/`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static('node_modules'));

app.post('/purchases', (req, res) => {
  var { fullName, email, password, shippingAddress, phone, creditNum, expDate, cvv, zip } = JSON.parse(req.body.purchaseInfo);
  
});


const connection = mysql.createConnection({
	user: 'root',
	password: 'Specwkc8@!'
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

db.connectAsync()
	.then(() => console.log(`Connected to CheckoutData database as ID ${db.threadId}`))
	.then(() => db.queryAsync('CREATE DATABASE IF NOT EXISTS CheckoutData'))
	.then(() => db.queryAsync('USE CheckoutData'))