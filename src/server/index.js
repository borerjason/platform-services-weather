require('dotenv').config()
const express = require('express');
const app = express();
const transferData = require('./utils/transferWeatherData');

app.listen(process.env.PORT, () => {
  console.log('connected');
});
