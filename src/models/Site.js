const mongoose = require('mongoose');

const SensorDataSchema = new mongoose.Schema({
  sensorId: String,
  data: [mongoose.Schema.Types.Mixed],  
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const NodeSchema = new mongoose.Schema({
  nodeId: String,
  sensors: [SensorDataSchema]
});

const SiteSchema = new mongoose.Schema({
  siteId: String,
  nodes: [NodeSchema]
});

const Site = mongoose.model('Site', SiteSchema);

module.exports = Site;
