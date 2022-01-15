const express = require("express");

const {authenticate} = require("../../middlewares");

const router = express.Router();

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

module.exports = router;