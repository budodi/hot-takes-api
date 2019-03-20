const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect('mongodb+srv://Budodi:5FxPqvZoigWeAHYx@cluster0-tkjqa.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas!');
    })
    .catch((error) => {
        console.log('Unable to connect to MongoDB Atlas!');
        console.error(error);
    });

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// body-parser parse (ie resolve into its component parts and describe their syntactic roles.) request body and extracts JSON object from the request.
app.use(bodyParser.json()); // set its json function as global middleware for the app.

app.use('/images', express.static(path.join(__dirname, 'images')));
// REGISTER ROUTER FOR ALL REQUEST TO /api/sauces TO THE APP
app.use('/api/auth', userRoutes);
app.use('/api/new-sauce', saucesRoutes);
app.use('/api/sauces', saucesRoutes);

module.exports = app;
