const Item = require("../Model/itemModel");
const PurchasedItem = require("../Model/purchasedItemModel");
const { getEsewaPaymentHash } = require("./esewa");

exports.initializePayment = async (req, res, next) => {
    try {

        const { itemId, totalAmount, itemName } = req.body;
        const itemData = await Item.findOne({
            _id: itemId,
            price: Number(totalAmount)
        })
        console.log(totalAmount)

        if (!itemData) {
            return res.status(400).json({
                success: false,
                message: "Item not found or price mismatch."
            });
        }

        const purchasedItemData = await PurchasedItem.create({
            itemId: itemId,
            itemName: itemName,
            paymentMethod: "esewa",
            totalPrice: totalAmount
        })
        console.log(`Rs. ${purchasedItemData.totalPrice}`);
        const paymentInitiate = await getEsewaPaymentHash({
            amount: purchasedItemData.totalPrice,
            transaction_uuid: purchasedItemData._id
        })

        res.status(200).json({
            success: true,
            message: "Payment initiated successfully",
            paymentInitiate: paymentInitiate,
            purchasedItemData
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });

    }

}