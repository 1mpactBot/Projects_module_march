console.log("I am working");
// then you connect with the server
const socket = io();


socket.on("message", (data) => { 
    console.log(`message from server : ${data}` )
});



