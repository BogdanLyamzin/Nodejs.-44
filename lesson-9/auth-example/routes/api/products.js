const express = require("express");
const {BadRequest, NotFound, Unauthorized} = require("http-errors")
const Joi = require("joi");

const {Product, joiProductSchema, joiProductUpdateSchema, joiProductUpdateIsSaleSchema} = require("../../models/product");
const {authenticate} = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, async(req, res, next)=> {
    try {
        const {page = 1, limit = 20} = req.query;
        const skip = (page - 1) * limit;
        const products = await Product.find(
            {owner: req.user._id}, 
            "-createdAt -updatedAt",
            {skip, limit: +limit}
            ).populate("owner", "name email");
        res.json(products);
    }
    catch(error){
        next(error);
    }
});

router.get("/:id", async(req, res, next)=> {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        if(!product){
            throw NotFound()
        }
        res.json(product);
    }
    catch(error) {
        if(error.message.includes("Cast to ObjectId failed")){
            error.status = 404;
        }
        next(error)
    }
})

router.post("/", authenticate, async(req, res, next)=> {
    try{
        const {error} = joiProductSchema.validate(req.body);
        if(error){
            throw new BadRequest(error.message)
        }
        const newProduct = await Product.create({...req.body, owner: req.user._id});
        res.status(201).json(newProduct);
    }
    catch(error) {
        next(error)
    }
});

router.put("/:id", authenticate, async(req, res, next)=> {
    try {
        const {error} = joiProductUpdateSchema.validate(req.body);
        if(error){
            throw new BadRequest(error.message)
        }
        const {id} = req.params;
        const product = await Product.findOne({_id: id, owner: req.user._id});
        if(!product){
            throw new Unauthorized()
        }
        const updateProduct = await Product.findByIdAndUpdate(id, req.body, {new: true});
        if(!updateProduct){
            throw NotFound();
        }
        res.json(updateProduct)
    }
    catch(error) {
        next(error)
    }
})

router.patch("/:id/insale", async(req, res, next)=> {
    try {
        const {error} = joiProductUpdateIsSaleSchema.validate(req.body);
        if(error){
            throw new BadRequest(error.message)
        }
        const {inSale} = req.body;
        const {id} = req.params;
        const updateProduct = await Product.findByIdAndUpdate(id, {inSale}, {new: true});
        if(!updateProduct){
            throw NotFound();
        }
        res.json(updateProduct)
    }
    catch(error){
        next(error);
    }
});

router.delete("/:id", async(req, res, next)=> {
    try{
        const {id} = req.params;
        const deleteProduct = await Product.findByIdAndRemove(id);
        if(!deleteProduct){
            throw NotFound()
        }
        res.json({message: "Delete success"})
    }
    catch(error) {
        next(error)
    }
})

module.exports = router;