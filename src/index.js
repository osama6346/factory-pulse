const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const SensorData = require('./models');
const cors = require('cors');
require('dotenv').config();
const app = express();
connectDB();

app.use(bodyParser.json());
app.use(cors());

app.post('/data', async (req, res) => {
  const {
    deviceName,
    time,
    xAxisVibrationSpeed,
    yAxisVibrationSpeed,
    zAxisVibrationSpeed,
    chipTime,
    xAxisAngularVibrationAmplitude,
    yAxisAngularVibrationAmplitude,
    zAxisAngularVibrationAmplitude,
    temperature,
    xAxisVibrationDisplacement,
    yAxisVibrationDisplacement,
    zAxisVibrationDisplacement,
    xAxisFrequencyVibrationFrequency,
    yAxisFrequencyVibrationFrequency,
    zAxisFrequencyVibrationFrequency
  } = req.body;

  try {
    const newSensorData = new SensorData({
      deviceName,
      time,
      xAxisVibrationSpeed: parseFloat(xAxisVibrationSpeed),
      yAxisVibrationSpeed: parseFloat(yAxisVibrationSpeed),
      zAxisVibrationSpeed: parseFloat(zAxisVibrationSpeed),
      chipTime: new Date(chipTime),
      xAxisAngularVibrationAmplitude: parseFloat(xAxisAngularVibrationAmplitude),
      yAxisAngularVibrationAmplitude: parseFloat(yAxisAngularVibrationAmplitude),
      zAxisAngularVibrationAmplitude: parseFloat(zAxisAngularVibrationAmplitude),
      temperature: parseFloat(temperature),
      xAxisVibrationDisplacement: parseFloat(xAxisVibrationDisplacement),
      yAxisVibrationDisplacement: parseFloat(yAxisVibrationDisplacement),
      zAxisVibrationDisplacement: parseFloat(zAxisVibrationDisplacement),
      xAxisFrequencyVibrationFrequency: parseInt(xAxisFrequencyVibrationFrequency, 10),
      yAxisFrequencyVibrationFrequency: parseInt(yAxisFrequencyVibrationFrequency, 10),
      zAxisFrequencyVibrationFrequency: parseInt(zAxisFrequencyVibrationFrequency, 10)
    });

    await newSensorData.save();

    res.status(201).send('Data saved');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.get('/data', async (req, res) => {
  try {
    const sensorData = await SensorData.find().sort({ timestamp: -1 }); 
    res.json(sensorData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.get('/', (req, res) => {
  res.send("Welcome to my server");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
