const fs = require("fs/promises");

const filePath = require("./productsPath")

const getAll = async()=> {
    const data = await fs.readFile(filePath);
    const products = JSON.parse(data);
    return products;
}

module.exports = getAll;