const express = require('express');
const { connectDatabase } = require('./database/connectDB');

const app = express();
app.use(express.json())
const port = 3001;
const Item = require('./Router/itemRouter')
const purchased = require('./Router/initializePaymentRouter')
const payment = require('./Router/verifyPaymentRouter')


connectDatabase()
app.use("/", Item);
app.use("/", purchased);
app.use("/", payment);

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/test.html");
});


app.listen(port, () => {
    console.log("Backend listening at http://localhost:3001");
})