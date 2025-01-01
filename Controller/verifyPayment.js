const Payment = require("../Model/paymentModel");
const PurchasedItem = require("../Model/purchasedItemModel");
const { sendEmail } = require("../utils/sendEmail");
const { verifyEsewaPayment } = require("./esewa")

exports.verifyPaymentController = async (req, res, next) => {
    const { data } = req.query
    try {
        const paymentInfo = await verifyEsewaPayment(data);

        const purchasedItemData = await PurchasedItem.findById(
            paymentInfo.response.transaction_uuid
        );

        if (!paymentInfo) {
            return res.status(500).json({
                success: false,
                message: "purchase not found",
                error: error
            });
        }

        const paymentData = await Payment.create({
            pidx: paymentInfo.decodedData.transaction_code,
            transactionId: paymentInfo.decodedData.transaction_code,
            productId: paymentInfo.response.transaction_uuid,
            amount: purchasedItemData.totalPrice,
            dataFromVerificationReq: paymentInfo,
            apiQueryFromUser: req.query,
            paymentGateway: "esewa",
            status: "success",
        })

        await PurchasedItem.findByIdAndUpdate(
            paymentInfo.response.transaction_uuid,
            { $set: { status: "completed" } }
        )

        res.status(200).json({
            success: true,
            message: "Payment  successfully",
            paymentData
        });

        await sendEmail({
            to: "xthaprabin125@gmail.com",
            subject: "Payment Received",
            html: `<p>Payment Received: ${paymentData.amount}
            </p>`,
        })
    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}

