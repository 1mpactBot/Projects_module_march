const express = require('express');

const http = require('http');
const socketTemplate = require('socket.io').Server;
const app = express();
// in publicFolder we will keep all the static files
app.use(express.static('publicFolder'));
// http server -> 
const nodeServer = http.createServer(app);
// socket server
const socketServer = new socketTemplate(nodeServer);




socketServer.on('connection', (socket) => {
    // whenever a new connection is made -> it will console it 
    console.log('New Connection', socket.id);
    // message is sedn to the client
    setInterval(() => {
        socket.emit("message", `message from server ${socket.id}`);
    }, 1000);
});







// responds to http requests
app.get("/", (req, res) => {
    res.send("<h1>Socket Server</h1>");
})
// listen through node server
nodeServer.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');

})