const express = require('express');
const router = express.Router();

const artController = require('../../../controllers/client/artController');

router.route('/').get(artController.getClientVideos);

router.route('/start').post(artController.startArtShow);

router.route('/control').post(artController.controlApplication);

module.exports = router;