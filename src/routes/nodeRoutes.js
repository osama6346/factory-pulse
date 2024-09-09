const express = require('express');
const router = express.Router();
const { addNode, getNodes, deleteNode } = require('../controllers/nodeController');

router.post('/node', addNode);
router.get('/nodes', getNodes);  
router.delete('/node/:nodeId', deleteNode);  

module.exports = router;
