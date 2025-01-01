const { default: mongoose } = require("mongoose");

const PurchasedItem = new mongoose.Schema({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ["esewa", "cod", "paypal"],
        required: true
    }
})