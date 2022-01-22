const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const {authenticate, upload} = require("../../middlewares");
const { User } = require("../../models/user");

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
});

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

router.patch("/avatars", authenticate, upload.single("avatar"), async(req, res, next)=> {
    try {
        const {_id: id} = req.user;
        const {path: tempUpload, originalname} = req.file;
        // image.png => 61e70ff03c1ec5a21147b692.png
        // fs.mkdir
        const [extension] = originalname.split(".").reverse();
        const filename = `${id}.${extension}`
        const resultUpload = path.join(avatarsDir, filename);
        await fs.rename(tempUpload, resultUpload);
        const avatarURL = `/avatars/${filename}`
        await User.findByIdAndUpdate(id, {avatarURL})
        res.json({
            avatarURL
        })
    }
    catch(error){
        await fs.unlink(tempUpload);
        next(error)
    }
    
})

module.exports = router;