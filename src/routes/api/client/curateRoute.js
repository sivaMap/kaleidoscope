const express = require('express');
const router = express.Router();

const curateController = require('../../../controllers/client/curateController')

router.route('/videos').get(curateController.getClientVideos);

router.route('/start').post(curateController.startCurate);

router.route('/controlshow').post(curateController.controlApplication);
router.route('/launch').post(curateController.launchApplication);

module.exports = router;