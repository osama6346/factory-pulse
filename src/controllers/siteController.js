const Site = require('../models/Site');

exports.addSite = async (req, res) => {
  const { siteId, siteName, siteRegion } = req.body;

  try {
    const newSite = new Site({
      siteId,
      siteName,
      siteRegion,
      nodes: [],
    });

    await newSite.save();
    res.status(201).json({ message: 'Site added successfully', site: newSite });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getSites = async (req, res) => {
    try {
      const sites = await Site.find();
      res.status(200).json(sites);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };

exports.deleteSite = async (req, res) => {
    const { siteId } = req.params;
  
    try {
      await Site.findOneAndDelete({ siteId });
      res.status(200).json({ message: 'Site deleted successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };

