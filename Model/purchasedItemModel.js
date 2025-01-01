const { default: mongoose } = require("mongoose");

const purchasedItemSchema = new mongoose.Schema({
    itemId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ["esewa", "khalti"],
        required: true,
        default: "esewa"

    },
    status: {
        type: String,
        enum: ["pending", "completed", "refunded"],
        default: "pending"
    }

}, { timestamps: true })

const PurchasedItem = mongoose.model("PurchasedItem", purchasedItemSchema);
module.exports = PurchasedItem;