const mongoose = require('mongoose');

const SensorSchema = new mongoose.Schema({
  sensorId: String,
  data: [mongoose.Schema.Types.Mixed],
  node: { type: mongoose.Schema.Types.ObjectId, ref: 'Node' }, 
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Sensor = mongoose.model('Sensor', SensorSchema);

module.exports = Sensor;
