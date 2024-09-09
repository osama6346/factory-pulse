const mongoose = require('mongoose');

const SiteSchema = new mongoose.Schema({
  siteId: String,
  siteName: String,
  siteRegion: String,
  nodes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Node' }],  
});

const Site = mongoose.model('Site', SiteSchema);

module.exports = Site;
