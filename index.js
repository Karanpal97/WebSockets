const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use("/",express.static(__dirname+"/public"))
io.on('connection', (socket) => {
   console.log('a user connected');
   console.log(socket.id)
   socket.on('disconnect', () => {
      console.log('user disconnected');
    })
    socket.on("new_mes",(data)=>{
      io.emit("mess_resvd",data)
      //socket.emit("mess_resvd",data)
     //socket.broadcast.emit("mess_resvd",data)
   
    })
 });


 
 server.listen(3008, () => {
   console.log('listening on *:3008');
 });
 
 