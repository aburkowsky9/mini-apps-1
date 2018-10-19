const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}/`));

app.use(express.static('client/dist'))