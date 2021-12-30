const {Product} = require("../../models");

const removeById = async(req, res, next)=> {
    const {id} = req.params;
    const deleteProduct = await Product.findByIdAndRemove(id);
    if(!deleteProduct){
        throw NotFound()
    }
    res.json({message: "Delete success"})
}

module.exports = removeById;