const Node = require('../models/Node');
const Site = require('../models/Site');

// Add a new node
exports.addNode = async (req, res) => {
  const { nodeId, nodeName, siteId } = req.body;

  try {
    const site = await Site.findOne({ siteId });

    if (!site) {
      return res.status(404).json({ message: 'Site not found' });
    }

    const newNode = new Node({
      nodeId,
      nodeName,
      site: site._id,
      sensors: [],
    });

    await newNode.save();

    site.nodes.push(newNode._id);
    await site.save();

    res.status(201).json({ message: 'Node added successfully', node: newNode });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all nodes
exports.getNodes = async (req, res) => {
  try {
    const nodes = await Node.find().populate('site', 'siteId siteName siteRegion');  
    res.status(200).json(nodes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete a node
exports.deleteNode = async (req, res) => {
  const { nodeId } = req.params;

  try {
    const node = await Node.findOneAndDelete({ nodeId });
    if (!node) {
      return res.status(404).json({ message: 'Node not found' });
    }

    // Remove node reference from its associated site
    await Site.updateOne(
      { _id: node.site },
      { $pull: { nodes: node._id } }
    );

    res.status(200).json({ message: 'Node deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
