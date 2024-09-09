const express = require('express');
const router = express.Router();
const { addSite, getSites, deleteSite} = require('../controllers/siteController');

router.post('/site', addSite);
router.get('/sites', getSites);
router.delete('/site/:siteId', deleteSite);
module.exports = router;
