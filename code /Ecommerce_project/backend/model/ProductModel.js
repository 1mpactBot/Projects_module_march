/***
 * ProductModel -> 
 * schema
 *      uniqueID -> mongodb
 *      item name
 *      description 
 *      price
 *      discount
 *      
 * 
 * 
 * ***/
/**
 * rules that an entity should follow
 * **/
const mongoose = require("mongoose");
const productSchemaRules = {
    producedBy: String,
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
    discount: {
        type: Number,
        validate: function () {
            return this.price > this.discount;
        }
    },
    brand: String
}
const productSchema = new mongoose.Schema(productSchemaRules);
const catgories = [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing"
];

productSchema.pre("save", function (next) {
    let isPresent = catgories.find((cCategory) => { return cCategory == this.category })
    if (isPresent == undefined) {
        const error = new Error("category is invalid");
        return next(error);
    }
    return next();
})
productSchema.pre("findOne", function (next) {
    this.select("-__v")
    next();
})
const ProductModel = new mongoose.model("ProductModel", productSchema);
// place where all the products will go while following the schems
module.exports = ProductModel;