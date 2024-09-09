const express = require('express');
const router = express.Router();
const { addSensorData, getSensors } = require('../controllers/sensorController');

router.post('/data/:siteId/:nodeId/:versionNumber?', addSensorData);
router.get('/sensors', getSensors);

module.exports = router;
