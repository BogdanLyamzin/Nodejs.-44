const express = require("express");

const products = require("./products");

const app = express();

app.set("json spaces", 8);
app.set("view engine", "ejs");
app.set("views", "views");

app.get("/products", (req, res)=> {
    // res.json(null);
    // res.send(null);
    // res.json(products);
    // res.send(products);
});

app.get("/contacts", (req, res)=> {
    res.render("homepage", {title: "Главная страница"})
})

app.listen(4000);