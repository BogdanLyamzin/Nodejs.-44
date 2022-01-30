const express = require("express");
const {NotFound, BadRequest} = require("http-errors");

const {User} = require("../../models");
const {sendEmail} = require("../../helpers")
const {authenticate} = require("../../middlewares");

const router = express.Router();

const {SITE_NAME} = process.env;

router.get("/current", authenticate, async(req, res, next)=> {
    try {
        const {name, email} = req.user;
        res.json({
            name,
            email
        })
    } catch (error) {
        next(error)
    }
})

router.get("/verify/:verificationToken", async(req, res, next)=> {
    try {
        const {verificationToken} = req.params;
        const user = await User.findOne({verificationToken});
        if(!user){
            throw NotFound();
        }
        await User.findByIdAndUpdate(user._id, {verify: true, verificationToken: null });
        res.json({
            message: 'Verification successful'
        })
    }
    catch(error){
        next(error)
    }

})

router.post("/verify", async(req, res, next)=> {
    try {
        const {email} = req.body;
        if(!email){
            throw new BadRequest("missing required field email")
        }
        const user = await User.findOne({email});
        if(!user) {
            throw NotFound();
        }
        if(user.verify){
            throw BadRequest("Verification has already been passed")
        }
        const {verificationToken} = user;
        const mail = {
            to: email,
            subject: "Верификация email",
            html: `<a target="_blank" href="${SITE_NAME}/api/users/verify/${verificationToken}">Потвердите свой email</a>`
        }
        await sendEmail(mail);
        res.json({email})
    }
    catch(error) {
        next(error)
    }
})

module.exports = router;