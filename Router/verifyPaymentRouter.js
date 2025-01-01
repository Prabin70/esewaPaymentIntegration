const express = require('express');
const { verifyPaymentController } = require('../Controller/verifyPayment');
const router = express.Router()

router.route("/complete-payment").get(verifyPaymentController)

module.exports = router;