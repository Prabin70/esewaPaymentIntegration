const express = require('express');
const { itemController } = require('../Controller/itemController');
const router = express.Router()
router.route("/create-item").post(itemController)

module.exports = router;