const SensorSettings = require('../models/SensorSettings');

exports.addOrUpdateSensorSettings = async (req, res) => {
  const { humidity, temperature, cost } = req.body;

  try {
    let settings = await SensorSettings.findOne();

    if (!settings) {
      settings = new SensorSettings({
        versionNumber: 1,
        humidity,
        temperature,
        cost,
      });
      await settings.save();
    } else {
      settings.humidity = humidity;
      settings.temperature = temperature;
      settings.cost = cost;
      settings.versionNumber += 1;
      await settings.save();
    }

    res.status(200).json({
      message: 'Sensor settings saved or updated successfully',
      settings,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
