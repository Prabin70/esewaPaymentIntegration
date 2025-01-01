const nodemailer = require("nodemailer");

const transportInfo = ({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "xthaprabin125@gmail.com",
        pass: "iiuh gulu rmjn xubf",
    },
});

exports.sendEmail = async (mailInfo) => {
    try {
        let transporter = nodemailer.createTransport(transportInfo);
        let info = await transporter.sendMail(mailInfo);
    } catch (error) {
        console.log("error occured", error.message);
    }
};
