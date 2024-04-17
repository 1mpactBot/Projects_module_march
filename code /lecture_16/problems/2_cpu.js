/***
 * usually these are some of the cpu intensive task
 * * image processing -> sharp
 * * video processing
 * * compression , decompression -> zlib
 * ***/

/***
 * denial of service attack -> request -> route -> a lot of time to answer the result
 * **/
// fib calculator


/***
 * 
 * i have only one v8 -> i can create parallel v8 engines 
 * that can run the calculateFibonacci part paralley
 * ***/

const express = require('express');
const app = express();
const cors = require("cors");
const { fork } = require("child_process");

app.use(cors());

// parent
app.get('/fib', (req, res) => {
    const { target, requestNumber } = req.query;
    console.log("received req", requestNumber);
    // synchronous
    //  a new v8 instance will be created and fibworker 
    // will exceuted there
    const fibWorker = fork("./fibWorker.js");

    // send the message like this
    fibWorker.send({ target });
    fibWorker.on("message", function (answer) {
        res.status(200).json({
            status: "success",
            message: answer,
            requestNumber: requestNumber
        })
        fibWorker.kill();
        return
    })

    // if there is some error
    fibWorker.on('error', (err) => {
        res.status(500).json({ error: 'An error occurred while processing the request.' });
    });


});

app.listen(3000, function () {
    console.log("server is running at port 3000");
})

