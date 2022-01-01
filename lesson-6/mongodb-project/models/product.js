const {Schema, model} = require("mongoose");
const Joi = require("joi");

const codeRegexp = /^[0-9]{9}$/;

const productSchema = Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    price: {
        type: Number,
        required: true,
        min: 0.01
    },
    inSale: {
        type: Boolean,
        default: true
    },
    status: {
        type: String,
        // "basic", "sale", "stock"
        enum: ["basic","sale", "stock"],
        default: "basic"
    },
    code: {
        type: String,
        required: true,
        match: codeRegexp,
        unique: true
    }
}, {versionKey: false, timestamps: true});



const joiProductCreateSchema = Joi.object({
    name: Joi.string().min(2).required(),
    price: Joi.number().min(0.01).required(),
    inSale: Joi.boolean,
    status: Joi.string().valueOf("basic","sale", "stock"),
    code: Joi.string().pattern(codeRegexp).required()
})

const joiProductUpdateSchema = Joi.object({
    name: Joi.string().min(2),
    price: Joi.number().min(0.01),
    inSale: Joi.boolean(),
    status: Joi.string().valueOf("basic","sale", "stock"),
    code: Joi.string().pattern(codeRegexp)
})

const joiProductUpdateIsSaleSchema = Joi.object({
    inSale: Joi.boolean().required()
});

const Product = model("product", productSchema);

const schemas = {
    productCreate: joiProductCreateSchema,
    productUpdate: joiProductUpdateSchema,
    productUpdateInSale: joiProductUpdateIsSaleSchema
}

module.exports = {
    Product,
    schemas
};
