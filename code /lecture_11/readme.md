**constraints** -> could only at max 16mb

## Purchase 
* bookedAt 
* priceAtThatTime
* order_id
* reciept_id -> Object(id)
* userDetails(Booked by) -> id of the user(UserModel)
* ProductDetails(BookedProduct) -> id of the product
* status of payment -> [pending, failure, success]
## Pefromance Impact
* by default -> only the booking object -> only going through bookingModel
* option -> also populate/replace (userId)(actual data of the user)-> userData

## logic of initalBooking
 /***
     * 1.get ProductId
     *  get userI-> req.userId-> 
     * 2. you will have to create booking object 
     *      go and find the user
     *      go and find the  product 
     * 3. use Razorpay to create an order
     * 4. save the order to booking object 
     * 5. send the order to the client
     * **/