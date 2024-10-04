const express = require('express');
const router = express.Router();

const curateController = require('../../../controllers/client/curateController')

router.route('/videos').get(curateController.getClientVideos);

router.route('/start').post(curateController.startCurate);

router.route('/control').post(curateController.controlApplication);

module.exports = router;