const mongoose = require('mongoose');

const NodeSchema = new mongoose.Schema({
  nodeId: String,
  nodeName: String,
  sensors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sensor' }],  
  site: { type: mongoose.Schema.Types.ObjectId, ref: 'Site' },  
});

const Node = mongoose.model('Node', NodeSchema);

module.exports = Node;
