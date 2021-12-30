const { Product } = require("../../models");

const updateSale = async (req, res, next) => {
    const { error } = joiProductUpdateIsSaleSchema.validate(req.body);
    if (error) {
        throw new BadRequest(error.message)
    }
    const { inSale } = req.body;
    const { id } = req.params;
    const updateProduct = await Product.findByIdAndUpdate(id, { inSale }, { new: true });
    if (!updateProduct) {
        throw NotFound();
    }
    res.json(updateProduct)
}

module.exports = updateSale;