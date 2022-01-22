const express = require("express");
const {BadRequest, Conflict, Unauthorized} = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

const {User, joiRegisterSchema, joiLoginSchema} = require("../../models/user");
const {authenticate} = require("../../middlewares");

const router = express.Router();

const {SECRET_KEY} = process.env;

// /signup
router.post("/register", async(req, res, next)=> {
    try {
        const {error} = joiRegisterSchema.validate(req.body);
        if(error){
            throw new BadRequest(error.message);
        }
        const {name, email, password} = req.body;
        const user = await User.findOne({email});
        if(user){
            throw new Conflict("Email already exist");
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const avatarURL = gravatar.url(email);
        const newUser = await User.create({name, email, avatarURL, password: hashPassword});

        res.status(201).json({
            email,
            name
        })
    }
    catch(error){
        next(error);
    }
});

// /signin
router.post("/login", async(req, res, next) => {
    try{
        const {error} = joiLoginSchema.validate(req.body);
        if(error){
            throw new BadRequest(error.message);
        }
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            throw new Unauthorized("Email or password is wrong");
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare) {
            throw new Unauthorized("Email or password is wrong");
        }
        const payload = {
            id: user._id
        }
        const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "1h"});
        await User.findByIdAndUpdate(user._id, {token})
        res.json({
            token
        })
    }
    catch(error) {
        next(error)
    }
});

router.get("/logout", authenticate, async(req, res, next)=> {
    try {
        await User.findByIdAndUpdate(req.user._id, {token: null});
        res.status(204).send();
    } catch (error) {
        next(error)
    }
})

module.exports = router;