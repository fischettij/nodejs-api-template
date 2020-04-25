const express = require('express');
const morgan = require('morgan');
var cors = require('cors')
const app = express();
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.use('/hello', (req, res, next) => {res.status(200).json({sucsess: "asd"})});

// Error Handling
app.use((req, res, next) => {
  const error = new Error('Nof Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;