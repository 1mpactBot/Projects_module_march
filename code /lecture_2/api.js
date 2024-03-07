const express = require("express");
const fs = require("fs");
// create a servr
const app = express();
// get -> home -> reply
// app.get("/", function (req, res) {
//     console.log("Hello got the request")
//     res.status(200).json({
//         result: "ok",
//         data: "recieved the request"
//     })
// })

// reading the content
const strContent = fs.readFileSync("./dev-data.json", "utf-8");
const userDataStore = JSON.parse(strContent);
// method , route , handler function
app.get("/api/user", function (req, res) {
    try {
        console.log("got the request for getting all users");
        if (userDataStore.length == 0) {
            throw new Error("No users are present")
        }
        // final result from the server
        res.status(200).json({
            status: "success",
            message: userDataStore
        })
    } catch (err) {
        res.status(404).json({
            status: "failure",
            message: err.message
        })
    }
})


/***
 * 1. getalltheUser -> return the whole data array  [get] -> done
 * 2. add a user -> send the data point [post]   
 * on the server level we want to give the 
 * unique id 
 * 3. get a particular user -> id [get]
 * 4. delete a user -> id [delete]
 * 5. update -> (poperty and id) [patch]
 * 
 *  routes -> /api/user
 *  methods-> 
 * **/

// /listen to the server
app.listen(3000, function () {
    console.log("server is running at port 3000");
})


/***
 * {
        "name": "Jasbir Singh",
        "username": "Karianne",
        "email": "Julianne.OConner@kory.org",
        "address": {
            "street": "Hoeger Mall",
            "suite": "Apt. 692",
            "city": "South Elvis",
            "zipcode": "53919-4257",
            "geo": {
                "lat": "29.4572",
                "lng": "-164.2990"
            }
        },
        "phone": "493-170-9623 x156",
        "website": "kale.biz",
        "company": {
            "name": "Robel-Corkery",
            "catchPhrase": "Multi-tiered zero tolerance productivity",
            "bs": "transition cutting-edge web services"
        },
        "id": "7i6f7xT6CYpoyvjBhs53iK"
    }
 * */ 