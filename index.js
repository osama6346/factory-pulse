const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./src/db.js');
const cors = require('cors');
require('dotenv').config();

const app = express();
connectDB();

app.use(bodyParser.json());
app.use(cors());

// Import routes
const sensorSettingsRoutes = require('./src/routes/sensorSettingsRoutes');
const siteRoutes = require('./src/routes/siteRoutes');
const nodeRoutes = require('./src/routes/nodeRoutes');
const sensorRoutes = require('./src/routes/sensorRoutes');

// Use routes
app.use(sensorSettingsRoutes);
app.use(siteRoutes);
app.use(nodeRoutes);
app.use(sensorRoutes);

app.get('/', (req, res) => {
  res.send("Welcome to my server");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
