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
      let sensor = await Sensor.findOne({ sensorId: sensorData.sensorId, node: node._id });

      if (sensor) {
        sensor.data.push(sensorData);
        await sensor.save();
      } else {
        sensor = new Sensor({
          sensorId: sensorData.sensorId,
          data: [sensorData],
          node: node._id,
        });
        await sensor.save();
        node.sensors.push(sensor._id);
        await node.save();
      }
    }

    const currentSettings = await SensorSettings.findOne();

    if (currentSettings && currentSettings.versionNumber != versionNumber) {
      return res.status(201).json({
        message: 'Sensor data saved',
        settings: currentSettings,
      });
    } else {
      return res.status(201).send('Sensor data saved');
    }

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
