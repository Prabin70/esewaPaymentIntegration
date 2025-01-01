const { config } = require("dotenv");
const { default: mongoose } = require("mongoose")

config()
exports.connectDatabase = () => {
    mongoose.connect(process.env.DB_URI);
    console.log("Database connected successfully");
}