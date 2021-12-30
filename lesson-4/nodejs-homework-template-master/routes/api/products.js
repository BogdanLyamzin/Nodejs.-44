const express = require("express");
// const createError = require("http-errors");
const {BadRequest, NotFound} = require("http-errors")
const Joi = require("joi");

const productsOperations = require("../../models/products")

const router = express.Router();

const joiSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().min(0.01).required()
})

const joiUpdateSchema = Joi.object({
    name: Joi.string(),
    price: Joi.number().min(0.01)
})

/*
1. Получить все.
2. Получить один по id.
3. Добавить.
4. Обновить по id.
5. Удалить по id.
*/

router.get("/", async(req, res, next)=> {
    try {
        const products = await productsOperations.getAll();
        res.json(products);
    }
    catch(error){
        next(error);
        // res.status(500).json({
        //     message: "Server not found"
        // })
    }
});

router.get("/:id", async(req, res, next)=> {
    try {
        const {id} = req.params;
        const product = await productsOperations.getById(id);
        if(!product){
            throw NotFound()
            // throw createError(404, "Not found")
            // const error = new Error("Not found");
            // error.status = 404;
            // throw error;
            // return res.status(404).json({
            //     message: "Not found"
            // });
        }
        res.json(product);
    }
    catch(error) {
        next(error)
    }
})

router.post("/", async(req, res, next)=> {
    try{
        const {error} = joiSchema.validate(req.body);
        if(error){
            throw new BadRequest(error.message)
            // error.status = 400;
            // throw error;
        }
        const newProduct = await productsOperations.add(req.body);
        res.status(201).json(newProduct)
    }
    catch(error) {
        next(error)
    }
});

router.put("/:id", async(req, res, next)=> {
    try {
        const {error} = joiUpdateSchema.validate(req.body);
        if(error){
            throw new BadRequest(error.message)
        }
        const {id} = req.params;
        const updateProduct = await productsOperations.updateById(id, req.body);
        if(!updateProduct){
            throw NotFound()
        }
        res.json(updateProduct)
    }
    catch(error) {
        next(error)
    }
})

router.delete("/:id", async(req, res, next)=> {
    try{
        const {id} = req.params;
        const deleteProduct = await productsOperations.removeById(id);
        if(!deleteProduct){
            throw NotFound()
        }
        res.json({message: "Delete success"})
        // res.status(204).json({message: "Delete success"})
    }
    catch(error) {
        next(error)
    }
})

module.exports = router;