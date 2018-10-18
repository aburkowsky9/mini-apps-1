const express = require('express');
const app = express();
const port = 3000;
app.listen(port, () => console.log(`Listening on http://localhost:${port}/`))
app.use(express.static('public'));
app.use(express.static('node_modules'));

