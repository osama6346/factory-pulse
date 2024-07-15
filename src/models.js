const mongoose = require('mongoose');

const SensorDataSchema = new mongoose.Schema({
  deviceName: String,
  time: String,
  xAxisVibrationSpeed: Number,
  yAxisVibrationSpeed: Number,
  zAxisVibrationSpeed: Number,
  chipTime: Date,
  xAxisAngularVibrationAmplitude: Number,
  yAxisAngularVibrationAmplitude: Number,
  zAxisAngularVibrationAmplitude: Number,
  temperature: Number,
  xAxisVibrationDisplacement: Number,
  yAxisVibrationDisplacement: Number,
  zAxisVibrationDisplacement: Number,
  xAxisFrequencyVibrationFrequency: Number,
  yAxisFrequencyVibrationFrequency: Number,
  zAxisFrequencyVibrationFrequency: Number,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const SensorData = mongoose.model('SensorData', SensorDataSchema);

module.exports = SensorData;
