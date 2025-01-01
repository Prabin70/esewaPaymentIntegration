const Item = require("../Model/itemModel");

exports.itemController = async (req, res) => {
    try {
        const result = await Item.create(req.body)


        res.status(200).json({
            success: true,
            message: "Item created successfully",
            data: result,
        });


    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });

    }
}