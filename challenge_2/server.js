//The JSON->CSV conversion specification is:

// The server must flatten the JSON hierarchy, mapping each item/object in the JSON to a single line of CSV report (see included sample output), where the keys of the JSON objects will be the columns of the CSV report.
// You may assume the JSON data has a regular structure and hierarchy (see included sample file). In other words, all sibling records at a particular level of the hierarchy will have the same set of properties, but child objects might not contain the same properties. In all cases, every property you encounter must be present in the final CSV output.
// You may also assume that child records in the JSON will always be in a property called `children`.
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const multer = require('multer');
const upload = multer();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
//By default, Express will look for a file called index.html and seve that file whenever you browse to the root '/' route.
app.listen(port, () => console.log(`Listening on http://localhost:${port}/`));
app.use(express.static('client'));
app.use(express.static('node_modules'));

let data = '';

app.post('/reports-data', (req, res) => {
  let report = JSON.parse(req.body.report);
  data = JSONToCSV(report);
  res.render('index', {csv: data});
});

app.post('/uploads', upload.single('file'), (req, res) => {
  console.log(req);
  // let report = JSON.parse(req.body.report);
  // data = JSONToCSV(report);
  // res.render('index', {csv: data});
});

const JSONToCSV = (report) => {
  var csv = 'firstName,lastName,county,city,role,sales\n'
  csv += `${report.firstName},${report.lastName},${report.county},${report.city},${report.role},${report.sales}\n`;
  
  if (report.children) {
    const helper = (children) => {
      for (let i = 0; i < children.length; i++) {
        csv += `${children[i].firstName},${children[i].lastName},${children[i].county},${children[i].city},${children[i].role},${children[i].sales}\n`;
        
        if (children[i].children) {
          helper(children[i].children);
        }
      }
    };
    helper(report.children);
  }
  
  return csv;
};