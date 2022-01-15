const {NotFound} = require("http-errors");

const {Product} = require("../../models")

const getById = async(req, res, next)=> {
    const {id} = req.params;
    const product = await Product.findById(id);
    if(!product){
        throw NotFound()
    }
    res.json(product);
}

module.exports = getById;