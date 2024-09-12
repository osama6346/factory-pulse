const mongoose = require('mongoose');

const SensorSchema = new mongoose.Schema({
  sensorId: { type: String, required: true },
  xAxisVibrationSpeed: { type: Number, required: false },
  yAxisVibrationSpeed: { type: Number, required: false },
  zAxisVibrationSpeed: { type: Number, required: false },
  chipTime: { type: Date, required: false },
  xAxisAngularVibrationAmplitude: { type: Number, required: false },
  yAxisAngularVibrationAmplitude: { type: Number, required: false },
  zAxisAngularVibrationAmplitude: { type: Number, required: false },
  temperature: { type: Number, required: false },
  xAxisVibrationDisplacement: { type: Number, required: false },
  yAxisVibrationDisplacement: { type: Number, required: false },
  zAxisVibrationDisplacement: { type: Number, required: false },
  xAxisFrequencyVibrationFrequency: { type: Number, required: false },
  yAxisFrequencyVibrationFrequency: { type: Number, required: false },
  zAxisFrequencyVibrationFrequency: { type: Number, required: false },
  windspeed: { type: Number, required: false },
  winddirection: { type: Number, required: false },
  latitude: { type: String, required: false },
  longitude: { type: String, required: false },
  node: { type: mongoose.Schema.Types.ObjectId, ref: 'Node' }, 
  timestamp: { type: Date, default: Date.now },
});

const Sensor = mongoose.model('Sensor', SensorSchema);

module.exports = Sensor;
