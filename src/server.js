var cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));

// Rutas
app.use('/hi', (req, res, next) => {res.status(200).json({sucsess: "asd"})});

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
