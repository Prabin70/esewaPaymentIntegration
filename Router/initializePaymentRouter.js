const express = require('express');
const { initializePayment } = require('../Controller/initializePayment');
const router = express.Router();

router.route("/initialize-esewa").post(initializePayment)
module.exports = router;