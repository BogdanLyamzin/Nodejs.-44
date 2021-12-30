const fs = require("fs/promises");

const filePath = require("./productsPath");

const updateProducts = async(products) => {
    await fs.writeFile(filePath, JSON.stringify(products));
}

module.exports = updateProducts;