const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Foundation = require('./api/foundation');
const morgan = require('morgan');
const db = require('./db/db');
const path = require('path');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use('/api/foundation', Foundation);

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

db.sync()
  .then(() =>
    app.listen(3000, function() {
      console.log('Server is listening on port 3000!');
    })
  )
  .catch(console.error);
