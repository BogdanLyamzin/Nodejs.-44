const {Product} = require("../../models");

const updateById = async(req, res, next)=> {
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

module.exports = updateById;