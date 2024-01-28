const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const mainRoute = require('./Route/mainRouter.js');
// const { app, server, io } = require("./server.js");
const app = express()
const cors = require("cors");
const cloudinary = require('cloudinary').v2;

const dbURI = process.env.DB_URI;

const PORT = 3000;

cloudinary.config({
  cloud_name: 'dkfgfnbst',
  api_key: '884498524894638',
  api_secret: 'Pq9oEfGMai_z5BuTr8sfYtTkI64'
});

// Connect to MongoDB
mongoose.connect(dbURI);
app.use(
  cors({
    origin: function (origin, callback) {
      return callback(null, true);
    },
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mongoose.connection;

// Event handling for database connection
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});


app.use(mainRoute);




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});