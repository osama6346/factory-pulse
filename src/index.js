const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const SensorData = require('./models');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Endpoint to handle incoming data (POST)
app.post('/data', async (req, res) => {
  const { temperature, humidity, pressure, deviceId } = req.body;

  try {
    const newSensorData = new SensorData({
      temperature,
      humidity,
      pressure,
      deviceId,
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

app.get('/', (req, res)=>{
    res.send("Welcome to my server")
})
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
