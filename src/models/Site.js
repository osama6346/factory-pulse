const mongoose = require('mongoose');

// Schema for SensorData using Mixed type for dynamic fields
const SensorDataSchema = new mongoose.Schema({
  sensorId: String,
  data: mongoose.Schema.Types.Mixed,  // Use Mixed type to allow any structure for sensor data
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

module.exports = Site;
