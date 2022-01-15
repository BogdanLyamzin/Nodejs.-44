const {Product} = require("../../models");

const add = async(req, res, next)=> {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
}

module.exports = add;