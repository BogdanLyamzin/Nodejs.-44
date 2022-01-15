const express = require("express");
const {BadRequest, NotFound} = require("http-errors")
const Joi = require("joi");

const {Product, joiProductSchema, joiProductUpdateSchema, joiProductUpdateIsSaleSchema} = require("../../models/product");

const router = express.Router();

router.get("/", async(req, res, next)=> {
    try {
        const products = await Product.find();
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

router.post("/", async(req, res, next)=> {
    try{
        const {error} = joiProductSchema.validate(req.body);
        if(error){
            throw new BadRequest(error.message)
        }
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
    }
    catch(error) {
        next(error)
    }
});

router.put("/:id", async(req, res, next)=> {
    try {
        const {error} = joiProductUpdateSchema.validate(req.body);
        if(error){
            throw new BadRequest(error.message)
        }
        const {id} = req.params;
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