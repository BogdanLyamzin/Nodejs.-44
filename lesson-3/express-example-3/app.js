const express = require("express");
const moment = require("moment");
const fs = require("fs/promises");
const cors = require("cors");

const products = require("./products");

const app = express();

app.use(cors());

// app.use(async (req, res, next)=> {
//     const {method, url} = req;
//     const date = moment().format("DD-MM-YYYY_hh:mm:ss");
//     const log = `\n${method} ${url} ${date}`;
//     await fs.appendFile("server.log", log);
//     next();
// });

// app.use((req, res, next)=> {
//     console.log("First middleware");
//     next();
// });

// app.use((req, res, next)=> {
//     console.log("Second middleware");
//     next();
// });

// app.use("/contacts", (req, res, next)=> {
//     console.log("Contact middleware")
// })

app.get("/products", (req, res, next)=> {
    res.json(products);
    // next();
})

// app.use((req, res, next)=> {
//     console.log("Third middleware")
// })


app.listen(4000);