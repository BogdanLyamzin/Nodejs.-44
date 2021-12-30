const express = require("express");
const {BadRequest, NotFound} = require("http-errors")
const Joi = require("joi");

const {ctrlWrapper, validation} = require("../../middlewares")
const {products: ctrl} = require("../../controllers");
const {Product, joiProductSchema, joiProductUpdateSchema, joiProductUpdateIsSaleSchema} = require("../../models/product");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", validation(joiProductSchema), ctrlWrapper(ctrl.add));

router.put("/:id", ctrlWrapper(ctrl.updateById))

router.patch("/:id/insale", ctrlWrapper(ctrl.updateSale));

router.delete("/:id", ctrlWrapper(ctrl.removeById))

module.exports = router;