const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises")

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"))

const tempDir = path.join(__dirname, "temp");
const productsDir = path.join(__dirname, "public", "products");

const multerConfig = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, tempDir);
    },
    filename: (req, file, cb)=> {
        cb(null, file.originalname)
    }
})

const upload = multer({ 
    storage: multerConfig
 });

// upload.single
// upload.array
// upoad.fields[{maxCount: 1, name: "image"}]

const products = [];

app.get("/api/products", (req, res)=> {
    res.json(products)
})

app.post("/api/products", upload.single("image"), async(req, res)=> {
    const {path: tempUpload, originalname} = req.file;
    const resultUpload = path.join(productsDir, originalname);
    await fs.rename(tempUpload, resultUpload);
    const image = `/products/${originalname}`;
    const newProduct = {
        name: req.body.name,
        image
    }
    products.push(newProduct);
    res.status(201).json(newProduct)
});

app.listen(3000)