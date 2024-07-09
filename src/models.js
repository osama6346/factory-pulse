const mongoose = require('mongoose');

const SensorDataSchema = new mongoose.Schema({
  temperature: Number,
  humidity: Number,
  pressure: Number,
  deviceId: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const SensorData = mongoose.model('SensorData', SensorDataSchema);

module.exports = SensorData;
