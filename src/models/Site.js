const mongoose = require('mongoose');

// Schema for SensorData
const SensorDataSchema = new mongoose.Schema({
  sensorId: String,
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

// Schema for Node
const NodeSchema = new mongoose.Schema({
  nodeId: String,
  sensors: [SensorDataSchema]
});

// Schema for Site
const SiteSchema = new mongoose.Schema({
  siteId: String,
  nodes: [NodeSchema]
});




const Site = mongoose.model('Site', SiteSchema);

module.exports =  Site;
