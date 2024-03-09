const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
// it adds all the enviornment variables to processe.env
const { DB_USER, DB_PASSWORD, LOCAL_PORT } = process.env;
// create a server
const app = express();
/****pre-defined/third party middleware**/
app.use(express.json());
const dbURL =
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.drcvhxp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(dbURL)
    .then(function (connection) {
        console.log(connection);
    }).catch(err => { console.log(err) });


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
    }
}
const productSchema = new mongoose.Schema(productSchemaRules);

const ProductModel=new mongoose.model("ProductModel",productSchema);





const PORT = process.env.PORT || LOCAL_PORT;
app.listen(PORT, function () {
    console.log("server is running at port 3000");
})

