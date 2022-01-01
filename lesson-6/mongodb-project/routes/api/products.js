const express = require("express");
const {BadRequest, NotFound} = require("http-errors")
const Joi = require("joi");

const {ctrlWrapper, validation} = require("../../middlewares")
const {products: ctrl} = require("../../controllers");
const {Product, schemas} = require("../../models/product");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", validation(schemas.productCreate), ctrlWrapper(ctrl.add));

router.put("/:id",validation(schemas.productUpdate),  ctrlWrapper(ctrl.updateById))

router.patch("/:id/insale", validation(schemas.productUpdateInSale), ctrlWrapper(ctrl.updateSale));

router.delete("/:id", ctrlWrapper(ctrl.removeById))

module.exports = router;