const express = require('express');
const router = express.Router();
const { addOrUpdateSensorSettings } = require('../controllers/sensorSettingsController');

router.post('/settings', addOrUpdateSensorSettings);

module.exports = router;
