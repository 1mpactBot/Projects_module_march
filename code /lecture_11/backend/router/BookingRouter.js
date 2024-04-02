const express = require("express");
const { protectRouteMiddleWare } = require("../controller/AuthController");
const UserModel = require("../model/UserModel");
const ProductModel = require("../model/ProductModel");
const BookingModel = require("../model/BookingModel");
const BookingRouter = express.Router();
const Razorpay = require('razorpay');
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_PUBLIC_KEY,
    key_secret: process.env.RAZORPAY_PRIVATE_KEY,
});


BookingRouter.post("/checkout",
    protectRouteMiddleWare,
    async function initialBookingController(req, res) {
        /***
         * 1.get ProductId
         *  get userI-> req.userId-> 
         * 2. you will have to create booking object 
         *  
         * 3. use Razorpay to create an order
         * 4. save the order to booking object 
         * 5. send the order to the client
         * **/

        try {
            // 1.get ProductId
            //     * get userI -> req.userId ->
            const { productId } = req.body;
            const userId = req.userId;
            if (!productId) {
                return res.status(201).json({
                    message: "please provide productId"
                })
            }
            /***************
             * create a booking
             * 1. get th current price
             * 2. getv all the entries reuired for booking creation
             * 3. create a booking
             * *****************/
            const product = await ProductModel.findById(productId);
            if (!product) {
                return res.status(401).json({
                    message: " product not found for the order"
                })
            }
            const { price } = product;
            const bookingObject = {
                priceAtThatTime: price,
                userDetails: userId,
                productDetails: productId,
                status: "pending"
            }
            const booking = await BookingModel.create(bookingObject);
            /****************
             * 3. order creation from razorpay
             *  * get the required deatils for order creation
             *  * create an order 
             * * update the booking with your order_id
             * * send the order to the client
             * **********************/
            const amount = booking.priceAtThatTime;
            const currency = "INR";
            const payment_capture = 1;
            const options = {
                amount: amount * 100,
                currency: currency,
                receipt: booking["_id"],
                payment_capture: payment_capture,
                // add few extra details 
            }
            // order creation 
            const orderObject = await razorpayInstance.orders.create(options);
            // update the booking with your order_id
            booking.payment_order_id = orderObject.id;
            await booking.save();
            res.status(200).json({
                status: 'success',
                message: orderObject
            });





        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "server error"
            })
        }
    })
BookingRouter.post("/verification", function paymentVerificationcontroller(req, res) {

})
BookingRouter.get("/:userId", function orderPage() {

})
BookingRouter.get("/", function allBookings() {

})
module.exports = BookingRouter;