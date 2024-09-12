const Site = require('../models/Site');
const Node = require('../models/Node');
const Sensor = require('../models/Sensor');
const SensorSettings = require('../models/SensorSettings');

exports.addSensorData = async (req, res) => {
  const { siteId, nodeId, versionNumber } = req.params;
  const sensorDataArray = req.body;

  try {
    const site = await Site.findOne({ siteId });
    if (!site) {
      return res.status(404).send('Site not found');
    }

    const node = await Node.findOne({ nodeId, site: site._id });
    if (!node) {
      return res.status(404).send('Node not found');
    }

    for (const sensorData of sensorDataArray) {
      const sensorDataToSave = {
        sensorId: sensorData.sensorId,
        ...(sensorData.xAxisVibrationSpeed !== undefined && { xAxisVibrationSpeed: sensorData.xAxisVibrationSpeed }),
        ...(sensorData.yAxisVibrationSpeed !== undefined && { yAxisVibrationSpeed: sensorData.yAxisVibrationSpeed }),
        ...(sensorData.zAxisVibrationSpeed !== undefined && { zAxisVibrationSpeed: sensorData.zAxisVibrationSpeed }),
        ...(sensorData.chipTime && { chipTime: sensorData.chipTime }),
        ...(sensorData.xAxisAngularVibrationAmplitude !== undefined && { xAxisAngularVibrationAmplitude: sensorData.xAxisAngularVibrationAmplitude }),
        ...(sensorData.yAxisAngularVibrationAmplitude !== undefined && { yAxisAngularVibrationAmplitude: sensorData.yAxisAngularVibrationAmplitude }),
        ...(sensorData.zAxisAngularVibrationAmplitude !== undefined && { zAxisAngularVibrationAmplitude: sensorData.zAxisAngularVibrationAmplitude }),
        ...(sensorData.temperature !== undefined && { temperature: sensorData.temperature }),
        ...(sensorData.xAxisVibrationDisplacement !== undefined && { xAxisVibrationDisplacement: sensorData.xAxisVibrationDisplacement }),
        ...(sensorData.yAxisVibrationDisplacement !== undefined && { yAxisVibrationDisplacement: sensorData.yAxisVibrationDisplacement }),
        ...(sensorData.zAxisVibrationDisplacement !== undefined && { zAxisVibrationDisplacement: sensorData.zAxisVibrationDisplacement }),
        ...(sensorData.xAxisFrequencyVibrationFrequency !== undefined && { xAxisFrequencyVibrationFrequency: sensorData.xAxisFrequencyVibrationFrequency }),
        ...(sensorData.yAxisFrequencyVibrationFrequency !== undefined && { yAxisFrequencyVibrationFrequency: sensorData.yAxisFrequencyVibrationFrequency }),
        ...(sensorData.zAxisFrequencyVibrationFrequency !== undefined && { zAxisFrequencyVibrationFrequency: sensorData.zAxisFrequencyVibrationFrequency }),
        ...(sensorData.windspeed !== undefined && { windspeed: sensorData.windspeed }),
        ...(sensorData.winddirection !== undefined && { winddirection: sensorData.winddirection }),
        ...(sensorData.latitude && { latitude: sensorData.latitude }),
        ...(sensorData.longitude && { longitude: sensorData.longitude }),
        node: node._id,
      };

      const newSensor = new Sensor(sensorDataToSave);
      await newSensor.save();

    }

    if (versionNumber) {
      const currentSettings = await SensorSettings.findOne();

      if (currentSettings && currentSettings.versionNumber != versionNumber) {
        return res.status(201).json({
          message: 'Sensor data saved',
          settings: currentSettings,
        });
      }
    }

    return res.status(201).send('Sensor data saved successfully');

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};



exports.getSensors = async (req, res) => {
  try {
    const sensors = await Sensor.find();
    res.status(200).json(sensors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
