const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./src/db.js');
const Site = require('./src/models/Site.js');  // Update to the new Site model
const SensorSettings = require('./src/models/SensorSettings.js');  // Update to the new Site model
const cors = require('cors');
require('dotenv').config();
const app = express();
connectDB();

app.use(bodyParser.json());
app.use(cors());

// Add or update SensorSettings
app.post('/settings', async (req, res) => {
  const { humidity, temperature, cost } = req.body;

  try {
    let settings = await SensorSettings.findOne();

    if (!settings) {
      settings = new SensorSettings({
        versionNumber: 1,
        humidity,
        temperature,
        cost
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
      settings
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.post('/data/:siteId/:nodeId/:versionNumber', async (req, res) => {
  const { siteId, nodeId, versionNumber } = req.params;
  const sensorDataArray = req.body;  

  try {
    let site = await Site.findOne({ siteId });

    if (!site) {
      site = new Site({
        siteId,
        nodes: [{
          nodeId,
          sensors: sensorDataArray.map(sensorData => ({
            sensorId: sensorData.sensorId,
            data: sensorData  
          }))
        }]
      });
    } else {
      let node = site.nodes.find(n => n.nodeId === nodeId);

      if (!node) {
        site.nodes.push({
          nodeId,
          sensors: sensorDataArray.map(sensorData => ({
            sensorId: sensorData.sensorId,
            data: sensorData  
          }))
        });
      } else {
        sensorDataArray.forEach(sensorData => {
          node.sensors.push({
            sensorId: sensorData.sensorId,
            data: sensorData  
          });
        });
      }
    }

    await site.save();

    const currentSettings = await SensorSettings.findOne();

    if (currentSettings && currentSettings.versionNumber != versionNumber) {
      return res.status(201).json({
        message: 'Sensor data saved',
        settings: currentSettings
      });
    } else {
      return res.status(201).send('Sensor data saved');
    }

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});



// GET data from /:siteId/:nodeId to retrieve all sensor data
app.get('/data/:siteId/:nodeId', async (req, res) => {
  const { siteId, nodeId } = req.params;

  try {
    const site = await Site.findOne({ siteId });
    
    if (!site) {
      return res.status(404).send('Site not found');
    }

    const node = site.nodes.find(n => n.nodeId === nodeId);

    if (!node) {
      return res.status(404).send('Node not found');
    }

    res.json(node.sensors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.get('/', (req, res) => {
  res.send("Welcome to my server");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
