const mongoose = require('mongoose');


const SensorSettingsSchema = new mongoose.Schema({
    versionNumber: Number,
    humidity: Number,
    temperature: Number,
    cost: Number
  });

const SensorSettings = mongoose.model('SensorSettings', SensorSettingsSchema);

module.exports = SensorSettings;
