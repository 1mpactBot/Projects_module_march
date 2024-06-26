const express =require("express");
const { createProduct,
    getAllProducts,
    getproductById,
    deleteProductById,
    updateProductById, }=require("../controller/ProductController");
const { isAdminMiddleWare } = require("../controller/AuthController");
const ProductRouter = express.Router();
/****create product**/
ProductRouter
    .post(createProduct)
    .get(isAdminMiddleWare,getAllProducts);
/*****get a product by it's ****/
ProductRouter.route("/:id")
    .get(getproductById)
    .delete(deleteProductById)
    .patch(updateProductById);

module.exports=ProductRouter;