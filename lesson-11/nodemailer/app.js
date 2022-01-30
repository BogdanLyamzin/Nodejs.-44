const nodemailer = require("nodemailer");
require("dotenv").config();

const {META_PASSWORD} = process.env;

const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: 465, // 25, 465, 2255,
    secure: true,
    auth: {
        user: "bogdan.lyamzin.d@meta.ua",
        pass: META_PASSWORD
    }
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const email = {
    to: "wetaga6623@showbaz.com",
    from: "bogdan.lyamzin.d@meta.ua",
    subject: "Новая заявка с сайта",
    html: "<p>С сайта пришла новая заявка</p>"
};

transporter.sendMail(email)
    .then(()=> console.log("Email send success"))
    .catch(error => console.log(error.message))
